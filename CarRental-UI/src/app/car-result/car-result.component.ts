import { Component, OnInit } from '@angular/core';
import { CarService } from '../_services/car.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { parseDate } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SearchCars } from '../_models/SearchCars';
import { PreBooking } from '../_models/PreBooking';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-car-result',
  templateUrl: './car-result.component.html',
  styleUrls: ['./car-result.component.css']
})
export class CarResultComponent implements OnInit {

cars: any;
//model: any;
model: SearchCars;
preBooking: PreBooking;
pickUpLocation;
returnLocation;
datePickUp;
dateReturn;
changeFilterField: boolean = false;
locations: Location[];

pickUpDateField: Date = new Date();
settings = {
  bigBanner: true,
  timePicker: true,
  format: 'dd-MM-yyyy hh:mm',
  defaultOpen: false
}
retunDateField: Date = new Date();


locationId = this.route.snapshot.queryParamMap.get('pickUpLocationId');
pickUpDate = this.route.snapshot.queryParamMap.get('pickUpDate');
returnDate = this.route.snapshot.queryParamMap.get('returnDate');
rLocationId = this.route.snapshot.queryParamMap.get('returnLocationId');
age = this.route.snapshot.queryParamMap.get('age');

  constructor(private carService: CarService, private alertify: AlertifyService, private route: ActivatedRoute, private router: Router, private locationService: LocationService, private fb: FormBuilder, private bookingService: BookingService) { }

  ngOnInit() {
    this.loadCars();
    this.datePickUp = parseDate(this.pickUpDate);
    // this.datePickUp = this.datePickUp.toDateString();
    this.dateReturn = parseDate(this.returnDate);
    this.locationsList();
    this.getPickUpLocationById();
    this.getReturnLocationById();
  }

  loadCars() {
    if (this.rLocationId === 'NaN') {
      this.rLocationId = this.locationId;
    }
    if (this.pickUpDate !== undefined && this.returnDate !== undefined && this.locationId !== undefined) {
      this.model = {
        pickUpDate: this.pickUpDate,
        returnDate : this.returnDate,
        pickUpLocationId : this.locationId,
        returnLocationId: this.rLocationId,
        driverAge: this.age
      }
      this.carService.searchCars(this.model).subscribe((result: any) => {
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

locationsList() {
  this.locationService.getLocationsForList().subscribe((locations: Location[]) => {
this.locations = locations;
  }, error => {
    console.log(error);
  });
}

addPreBooking(carId: number) {

  const model = {
    carId: carId,
    pickUpLocationId: parseInt(this.locationId),
    returnLocationId: parseInt(this.rLocationId),
    pickUpDate: parseDate(this.pickUpDate),
    returnDate: parseDate(this.returnDate),
    driverAge: parseInt(this.age)
  };

  this.bookingService.addPreBooking(model).subscribe((result: any) => {
    console.log(result);
  });


}


// searchCars() {
// if (this.searchCarsForm.valid) {
//   this.model = Object.assign({}, this.searchCarsForm.value);
//   const locationId = this.model.pickUpLocationId;
//   const rLocationId = this.model.returnLocationId;
//   const driverAge = this.model.driverAge;
//   const pickDate2 = parseDate(this.model.pickUpDate);
//   const returnDate2 = parseDate(this.model.returnDate);
//   this.router.navigate(['/car-result'], { queryParams: { pickUpDate: pickDate2.toISOString(), pickUpLocationId: locationId, returnDate: returnDate2.toISOString(), returnLocationId: rLocationId, age: driverAge }});

// }
// }

}
