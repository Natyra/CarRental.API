import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { Location } from '../_models/Location';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { CarService } from '../_services/car.service';
import { Car } from '../_models/car';
import { SearchCars } from '../_models/SearchCars';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchCarsForm: FormGroup;
locations: Location[];
cars: Car[];
model: SearchCars;
// pickUpLocationId;
// // returnLocationId;
// pickUpDate;
// returnDate;
dp;
myDate;
pipe;
  constructor(private locationService: LocationService, private fb: FormBuilder, private datePipe: DatePipe, private carService: CarService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.myDate);
   }

  ngOnInit() {
    this.createSearchCarsForm();
    this.locationsList();
    this.dp = new Date().getUTCFullYear() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDate();
    console.log(this.dp);
  }

  createSearchCarsForm() {
    this.searchCarsForm = this.fb.group({
      pickUpLocationId: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  locationsList() {
    this.locationService.getLocationsForList().subscribe((locations: Location[]) => {
this.locations = locations;
    }, error => {
      console.log(error);
    });
  }

  get today() {
    return new Date();
  }

searchCars() {
  if (this.searchCarsForm.valid) {
    this.model = Object.assign({}, this.searchCarsForm.value);
    const datenow =  Date.now(); //working here
    return false;
      // return this.carService.searchCars(this.model).subscribe((result: any) => {
      //   console.log(result.result);
      // })
  }
}

}
