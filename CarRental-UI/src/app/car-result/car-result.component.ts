import { Component, OnInit } from '@angular/core';
import { CarService } from '../_services/car.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { parseDate } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SearchCars } from '../_models/SearchCars';

@Component({
  selector: 'app-car-result',
  templateUrl: './car-result.component.html',
  styleUrls: ['./car-result.component.css']
})
export class CarResultComponent implements OnInit {

cars: any;
//model: any;
model: SearchCars;

pickUpLocation;
returnLocation;
datePickUp;
dateReturn;
changeFilterField: boolean = false;
searchCarsForm: FormGroup;
locations: Location[];

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

  constructor(private carService: CarService, private alertify: AlertifyService, private route: ActivatedRoute, private router: Router, private locationService: LocationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadCars();
    this.getPickUpLocationById();
    this.getReturnLocationById();
    this.datePickUp = parseDate(this.pickUpDate);
    // this.datePickUp = this.datePickUp.toDateString();
    this.dateReturn = parseDate(this.returnDate);

    this.createSearchCarsForm();
    this.locationsList();
  }

  loadCars() {
  if (this.pickUpDate !== undefined && this.returnDate !== undefined && this.locationId !== undefined) {
      this.model = {
        pickUpDate: this.pickUpDate,
        returnDate : this.returnDate,
        pickUpLocationId : this.locationId,
        returnLocationId: this.rLocationId,
        driverAge: this.age
      }

      console.log(this.model);
      this.carService.searchCars(this.model).subscribe((result: any) => {

        console.log(result.result.cars);
        this.cars = result.result.cars;
      }, error => {
        this.alertify.error(error.error);
      });
  }
}

changeFilter() {
  this.changeFilterField = true;
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

createSearchCarsForm() {
  const minutesAdded = this.addMinutes(this.pickUpDateField, 5);
  const daysAdded = this.addDays(this.retunDateField, 3);
  this.searchCarsForm = this.fb.group({
    pickUpLocationId: ['', Validators.required],
    pickUpDate: [minutesAdded, Validators.required],
    returnDate: [daysAdded, Validators.required],
    returnLocationId: ['', null],
    driverAge: ['', null]
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

locationsList() {
  this.locationService.getLocationsForList().subscribe((locations: Location[]) => {
this.locations = locations;
  }, error => {
    console.log(error);
  });
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

}
