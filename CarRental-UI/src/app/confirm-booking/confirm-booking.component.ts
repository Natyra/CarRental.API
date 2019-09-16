import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreBooking } from '../_models/PreBooking';
import { BookingService } from '../_services/booking.service';
import { AlertifyService } from '../_services/alertify.service';
import { LocationService } from '../_services/location.service';
import {Location} from '../_models/Location';
import { CarService } from '../_services/car.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {


  pickUpLocation: string;
  returnLocation: string;
  datePickUp: string;
  dateReturn: string;
  pickUpLocationId: number;
  returnLocationId: number;

  path: string;
  carCapacity: number;
  numberOfDoors: number;
  transmisionType: string;
  brandName: string;
  modelName: string;
  modelYear: number;
  priceForDay: number;
  changeFilterField = false;

  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;

  pbId = this.route.snapshot.queryParamMap.get('pb');
  carId = this.route.snapshot.queryParamMap.get('car');
  userId = this.route.snapshot.queryParamMap.get('user');
  constructor(private route: ActivatedRoute, private bookingService: BookingService, private alertify: AlertifyService, private locationService: LocationService, private carService: CarService, private userService: UserService) { }

  ngOnInit() {
    this.getPreBookingById();
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
        this.getCustomerById(this.userId);
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
  changeCustomerDetails() { }
}
