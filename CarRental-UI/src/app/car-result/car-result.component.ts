import { Component, OnInit } from '@angular/core';
import { CarService } from '../_services/car.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router, RouterStateSnapshot, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { parseDate } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SearchCars } from '../_models/SearchCars';
import { PreBooking } from '../_models/PreBooking';
import { BookingService } from '../_services/booking.service';
import { PaginatedResult } from '../_models/Pagination';
import { Car } from '../_models/Car';

@Component({
  selector: 'app-car-result',
  templateUrl: './car-result.component.html',
  styleUrls: ['./car-result.component.css']
})
export class CarResultComponent implements OnInit {

cars: any;
//model: any;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;

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

endUrl: string;
navigationEnd;
navigationStart: string;
noCarsFound: string;

  constructor(private carService: CarService, private alertify: AlertifyService, private route: ActivatedRoute, private router: Router, private locationService: LocationService, private fb: FormBuilder, private bookingService: BookingService) { 
    this.router.events.subscribe( (event: Event) => {

    if (event instanceof NavigationStart) {
        this.endUrl = this.navigationEnd;
        this.navigationStart = event.url;
    } else if (event instanceof NavigationEnd) {
        this.navigationEnd = event.url;
        this.locationId = this.route.snapshot.queryParamMap.get('pickUpLocationId');
        this.pickUpDate = this.route.snapshot.queryParamMap.get('pickUpDate');
        this.returnDate = this.route.snapshot.queryParamMap.get('returnDate');
        this.rLocationId = this.route.snapshot.queryParamMap.get('returnLocationId');
        this.age = this.route.snapshot.queryParamMap.get('age');
        if (this.navigationStart !== this.endUrl) {
          this.loadCars();
          this.changeFilterField = false;
        }
    }
});

  }

  ngOnInit() {
    this.loadCars();
    this.datePickUp = this.pickUpDate;
    // this.datePickUp = this.datePickUp.toDateString();
    this.dateReturn = this.returnDate;
    this.locationsList();
    this.getPickUpLocationById();
    this.getReturnLocationById();
  }
  


  loadCars() {
    if (this.locationId !== null && this.locationId !== undefined && this.locationId !== '0' && this.locationId !== 'NaN' && this.pickUpDate !== null && this.pickUpDate !== undefined && this.pickUpDate !== 'NaN'  && this.returnDate !== null && this.returnDate !== undefined && this.returnDate !== 'NaN') {
      this.model = {
        pickUpDate: this.pickUpDate,
        returnDate : this.returnDate,
        pickUpLocationId : this.locationId,
        returnLocationId: this.rLocationId,
        driverAge: this.age
      }
      this.carService.searchCars(this.model, this.currentPage, this.itemsPerPage).subscribe((result: PaginatedResult<any>) => {
        console.log(result);
        this.cars = result.result.cars;
        this.currentPage = result.pagination.currentPage;
        this.totalItems = result.pagination.totalItems;
        this.totalPages = result.pagination.totalPages;
        this.itemsPerPage = result.pagination.itemsPerPage;

        if (this.cars.length <= 0) {
          this.noCarsFound = 'No Car Founded';
        } else {
          this.noCarsFound = '';
        }
      }, error => {
        this.alertify.error(error.error);
      });
  }
}

changeFilter() {
  this.changeFilterField = true;
}
pageChanged(event: any): void {
  this.currentPage = event;
  this.loadCars();
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
    pickUpDate: this.pickUpDate,
    returnDate: this.returnDate,
    driverAge: parseInt(this.age)
  };

  this.bookingService.addPreBooking(model).subscribe((result: any) => {
    console.log(result);
    this.router.navigate(['/booking-summary'], { queryParams: { pb: result.pb, car: result.car}});
  }, error => {
    this.alertify.error(error.error);
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
