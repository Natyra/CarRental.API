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
    
  }

  changeFilter() {
    this.changeFilterField = true;
  }

  getPreBookingById() {
    return this.bookingService.getPreBookingById(parseInt(this.pbId)).subscribe((result: PreBooking
      ) => {
        this.datePickUp = result.pickUpDate;
        this.dateReturn = result.returnDate;
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
      console.log(result);
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
 
    if (this.userId !== undefined && this.userId !== 'NaN' && this.userId !== '' && this.userId !== null){
    this.getCustomerById(this.userId);
   
    this.addCustomerForm = this.fb.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      phoneNumber: [this.phoneNumber, Validators.required],
      email: [this.email, Validators.required]
    });
  } else {
    this.addCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  }

  getCustomerById(id: string) {
    this.userService.getUserById(id).subscribe((result: User) => {
      console.log(result);
      this.firstName = result.firstName;
      this.lastName = result.lastName;
      this.phoneNumber = result.phoneNumber;
      this.email = result.email;
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
