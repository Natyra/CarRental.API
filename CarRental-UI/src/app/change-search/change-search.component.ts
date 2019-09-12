import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parseDate } from 'ngx-bootstrap';
import { SearchCars } from '../_models/SearchCars';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-change-search',
  templateUrl: './change-search.component.html',
  styleUrls: ['./change-search.component.css']
})
export class ChangeSearchComponent implements OnInit {
  searchCarsForm: FormGroup;
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

  constructor(private locationService: LocationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private alertify: AlertifyService) { }

  ngOnInit() {
    this.locationsList();
    this.datePickUp = parseDate(this.pickUpDate);
    // this.datePickUp = this.datePickUp.toDateString();
    this.dateReturn = parseDate(this.returnDate);
    this.createSearchCarsForm();
    this.getPickUpLocationById();
    this.getReturnLocationById();

    if (parseInt(this.rLocationId) !== 0) {
      this.isCheckedField = true;
      this.showReturnLocationField = true;
    } else {
      this.isCheckedField = false;
    }

    if(parseInt(this.age) === 0) {
      this.isDriverAgeZero = true;
      this.showInputOfAgeField = false;
    } else {
      this.isDriverAgeZero = false;
      this.showInputOfAgeField = true;
    }

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
    const minutesAdded = this.addMinutes(this.pickUpDateField, 5);
    const daysAdded = this.addDays(this.retunDateField, 3);
    this.searchCarsForm = this.fb.group({
      pickUpLocationId: [parseInt(this.locationId), Validators.required],
      pickUpDate: [minutesAdded, Validators.required],
      returnDate: [daysAdded, Validators.required],
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
      const rLocationId = this.model.returnLocationId;
      const driverAge = this.model.driverAge;
      const pickDate2 = parseDate(this.model.pickUpDate);
      const returnDate2 = parseDate(this.model.returnDate);
      this.router.navigate(['/car-result'], { queryParams: { pickUpDate: pickDate2.toISOString(), pickUpLocationId: locationId, returnDate: returnDate2.toISOString(), returnLocationId: rLocationId, age: driverAge }});
    
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
