import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parseDate } from 'ngx-bootstrap';
import { SearchCars } from '../_models/SearchCars';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CarService } from '../_services/car.service';
import { EventEmitter } from 'events';
import { BookingService } from '../_services/booking.service';


@Component({
  selector: 'app-change-search',
  templateUrl: './change-search.component.html',
  styleUrls: ['./change-search.component.css']
})
export class ChangeSearchComponent implements OnInit {
  searchCarsForm: FormGroup;
// cars: any;
@Output() cars = new EventEmitter();
model: SearchCars;
locations: Location[];
pickUpLocation;
returnLocation;
datePickUp;
dateReturn;
isCheckedField: boolean = false;
isDriverAgeZero: boolean = false;
changeFilterField: boolean = false;
pickUpDateField: Date = new Date();
settings = {
  bigBanner: true,
  timePicker: true,
  format: 'dd-MM-yyyy hh:mm',
  defaultOpen: false
}
retunDateField: Date = new Date();

showReturnLocationField: boolean = false;
showInputOfAgeField: boolean = false;

locationId = this.route.snapshot.queryParamMap.get('pickUpLocationId');
pickUpDate = this.route.snapshot.queryParamMap.get('pickUpDate');
returnDate = this.route.snapshot.queryParamMap.get('returnDate');
rLocationId = this.route.snapshot.queryParamMap.get('returnLocationId');
age = this.route.snapshot.queryParamMap.get('age');
pbId = this.route.snapshot.queryParamMap.get('pb');

  constructor(private carService: CarService, private locationService: LocationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private alertify: AlertifyService, private bookingService: BookingService) { }

  ngOnInit() {
    if (this.pbId !== undefined && this.pbId !== 'NaN' && this.pbId !== '' && this.pbId !== null){
      this.getPreBookingById(parseInt(this.pbId));
    } else {
      this.getAddresses();
      if(parseInt(this.age) === 0) {
        this.isDriverAgeZero = true;
        this.showInputOfAgeField = false;
      } else {
        this.isDriverAgeZero = false;
        this.showInputOfAgeField = true;
      }
    }
    this.locationsList();
    this.datePickUp = this.pickUpDate;
    // this.datePickUp = this.datePickUp.toDateString();
    this.dateReturn = this.returnDate;
    this.createSearchCarsForm();
    

    if (parseInt(this.rLocationId) !== 0 && parseInt(this.rLocationId) === parseInt(this.locationId)) {
      this.isCheckedField = true;
      this.showReturnLocationField = true;
    } else {
      this.isCheckedField = false;
    }
   
  }
getAddresses() {
    this.getPickUpLocationById();
    this.getReturnLocationById();
}
  getPreBookingById(id: number){
    return this.bookingService.getPreBookingById(id).subscribe((result: any) => {
      this.locationId = result.pickUpLocationId;
      this.pickUpDate = parseDate(result.pickUpDateReal).toString();
      this.returnDate = parseDate(result.returnDateReal).toString();
      this.rLocationId = result.returnLocationId;
      this.age = result.driverAge;

    this.createSearchCarsForm();
    this.getPickUpLocationById();
      this.getReturnLocationById();
      if(parseInt(this.age) === 0) {
        this.isDriverAgeZero = true;
        this.showInputOfAgeField = false;
      } else {
        this.isDriverAgeZero = false;
        this.showInputOfAgeField = true;
      }
    }, error => {
      this.alertify.error(error.error);
    })
  }

  getPickUpLocationById() {
    this.locationService.getLocationById(parseInt(this.locationId)).subscribe((location: Location) => {
      this.pickUpLocation =  location.streetAddress + ', ' + location.zipCode + ', ' + location.city + ', ' + location.country;
    }, error => {
      this.alertify.error(error.error);
    });
  }
  
  getReturnLocationById() {
    this.locationService.getLocationById(parseInt(this.rLocationId)).subscribe((location: Location) => {
      this.returnLocation =  location.streetAddress + ', ' + location.zipCode + ', ' + location.city + ', ' + location.country;
    }, error => {
      this.alertify.error(error.error);
    });
  }

  locationsList() {
    this.locationService.getLocationsForList().subscribe((locations: Location[]) => {
  this.locations = locations;
    }, error => {
      console.log(error);
    });
  }

  createSearchCarsForm() {
    this.searchCarsForm = this.fb.group({
      pickUpLocationId: [parseInt(this.locationId), Validators.required],
      pickUpDate: [this.pickUpDate, Validators.required],
      returnDate: [this.returnDate, Validators.required],
      returnLocationId: [parseInt(this.rLocationId), null],
      driverAge: [parseInt(this.age), null]
    });
  }
  
  addMinutes(date, minutes) {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  }
  
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  searchCars() {
    if (this.searchCarsForm.valid) {
      this.model = Object.assign({}, this.searchCarsForm.value);
      const locationId = this.model.pickUpLocationId;
      let rLocationId = 0;
      if(this.model.returnLocationId != null) {
      rLocationId = this.model.returnLocationId;
      } else {
        rLocationId = this.model.pickUpLocationId;
      }
      const driverAge = this.model.driverAge;
      const pickDate2 = this.model.pickUpDate;
      const returnDate2 = this.model.returnDate;
      console.log(this.model.pickUpDate);
      this.router.navigate(['/car-result'], { queryParams: { pickUpDate: pickDate2, pickUpLocationId: locationId, returnDate: returnDate2, returnLocationId: rLocationId, age: driverAge }});
    }
    }

   

    showReturnLocation(event: any) {
      const rLocationControl = this.searchCarsForm.get('returnLocationId');
    
      if (event.currentTarget.checked) {
        this.showReturnLocationField = true;
        rLocationControl.setValidators([Validators.required]);
      } else {
        this.showReturnLocationField = false;
        rLocationControl.setValidators(null);
    
      }
    
      rLocationControl.updateValueAndValidity();
    }
    
    showInputOfAge(event: any) {
      const driverAgeControl = this.searchCarsForm.get('driverAge');
      if (event.currentTarget.checked) {
        this.showInputOfAgeField = false;
        driverAgeControl.setValidators(null);
      } else {
        this.showInputOfAgeField = true;
        driverAgeControl.setValidators([Validators.required]);
    
    
      }
    
      driverAgeControl.updateValueAndValidity();
    }

}
