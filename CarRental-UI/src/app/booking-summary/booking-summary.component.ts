import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../_services/booking.service';
import { PreBooking } from '../_models/PreBooking';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { AlertifyService } from '../_services/alertify.service';
import { CarService } from '../_services/car.service';
import { Car } from '../_models/Car';
import { CarAdd } from '../_models/CarAdd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { parseDate } from 'ngx-bootstrap';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {
  addCustomerForm: FormGroup;
  model: User;
  changeFilterField: boolean = false;
  pickUpLocation;
  returnLocation;
  datePickUp;
  dateReturn;
  pickUpLocationId;
  returnLocationId;

  brandName: string;
  modelName: string;
  path: string;
  carCapacity: number;
  numberOfDoors: number;
  transmisionType: string;
  modelYear: string;
  priceForDay: number;

  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;

  pbId = this.route.snapshot.queryParamMap.get('pb');
  carId = this.route.snapshot.queryParamMap.get('car');
  userId = this.route.snapshot.queryParamMap.get('user');

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private locationService: LocationService, private alertify: AlertifyService, private carService: CarService, private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
   
    this.getPreBookingById();
    this.addCustomerInfoForm();
    
    if (this.userId !== undefined && this.userId !== 'NaN' && this.userId !== '' && this.userId !== null){
      console.log(this.userId);
      this.getCustomerById();
    }

  }

  changeFilter() {
    this.changeFilterField = true;
  }

  getPreBookingById() {
    return this.bookingService.getPreBookingById(parseInt(this.pbId)).subscribe((result: PreBooking
      ) => {
        console.log(result);
        this.datePickUp = parseDate(result.pickUpDateReal);
        this.dateReturn = parseDate(result.returnDateReal);
        this.pickUpLocationId = result.pickUpLocationId;
        this.returnLocationId = result.returnLocationId;

        this.getPickUpLocationById(this.pickUpLocationId);
        this.getReturnLocationById(this.returnLocationId);
        this.getCarById(parseInt(this.carId));
      }, error => {
        this.alertify.error(error.error);
      });
  }

  getPickUpLocationById(id: number) {
    this.locationService.getLocationById(id).subscribe((location: Location) => {
      this.pickUpLocation =  location.streetAddress + ', ' + location.zipCode + ', ' + location.city + ', ' + location.country;
    }, error => {
      this.alertify.error(error.error);
    });
  }
  
  getReturnLocationById(id: number) {
    this.locationService.getLocationById(id).subscribe((location: Location) => {
      this.returnLocation =  location.streetAddress + ', ' + location.zipCode + ', ' + location.city + ', ' + location.country;
    }, error => {
      this.alertify.error(error.error);
    });
  }
  getCarById(id: number) {
    return this.carService.getCarById(id).subscribe((result: any) =>{
      this.brandName = result.brandName;
      this.modelName = result.modelName;
      this.modelYear = result.modelYear;
      this.priceForDay = result.priceForDay;
      this.numberOfDoors = result.numberOfDoors;
      this.carCapacity = result.carCapacity;
      this.transmisionType = result.transmisionType;
      this.path = result.path;
    })
  }

  addCustomerInfoForm() {
    this.addCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  getCustomerById() {
    this.userService.getUserById(this.userId).subscribe((result: User) => {
      this.firstName = result.firstName;
      this.lastName = result.lastName;
      this.phoneNumber = result.phoneNumber;
      this.email = result.email;

      this.addCustomerForm = this.fb.group({
        firstName: [result.firstName, Validators.required],
        lastName: [result.lastName, Validators.required],
        phoneNumber: [result.phoneNumber, Validators.required],
        email: [result.email, Validators.required]
      });
    }, error => {
      this.alertify.error(error.error);
    });
  }

  addCustomerInfo() {
    if (this.addCustomerForm.valid) {
      this.model = Object.assign({}, this.addCustomerForm.value);
      this.model.carId = parseInt(this.carId);
      this.model.preBookingId = parseInt(this.pbId);
      this.userService.addCustomer(this.model).subscribe((result: any) => {
        console.log(result);
        this.router.navigate(['/confirm-booking'], { queryParams: { pb: result.pb, car: result.car, user: result.user}});

      }, error => {
        this.alertify.error(error.error);
      });
    }
   }

}
