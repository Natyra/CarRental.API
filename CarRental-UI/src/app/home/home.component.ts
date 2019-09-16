import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { Location } from '../_models/Location';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { CarService } from '../_services/car.service';
import { Car } from '../_models/car';
import { SearchCars } from '../_models/SearchCars';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { parseDate } from 'ngx-bootstrap';

// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class HomeComponent implements OnInit {
  searchCarsForm: FormGroup;
locations: Location[];
cars: Car[];
model: SearchCars;

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


constructor(private locationService: LocationService, private fb: FormBuilder, private carService: CarService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.createSearchCarsForm();
    this.locationsList();
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
    let rLocationId = this.model.returnLocationId;
    let driverAge = this.model.driverAge;
    const pickDate2 = this.model.pickUpDate;
    const returnDate2 = this.model.returnDate;

    if(rLocationId === '') {
      rLocationId = locationId;
    }
    if (driverAge === '') {
      driverAge = 0;
    }
    this.router.navigate(['/car-result'], { queryParams: { pickUpDate: pickDate2, pickUpLocationId: locationId, returnDate: returnDate2, returnLocationId: rLocationId, age: driverAge }});

  }
}

}
