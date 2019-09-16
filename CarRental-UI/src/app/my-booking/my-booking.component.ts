import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../_services/booking.service';
import { Booking } from '../_models/Booking';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
id = +this.route.snapshot.paramMap.get('id');
model: Booking;
bookingId: number;
pickUpDate: Date;
pickUpLocation: string;
returnDate: Date;
returnLocation: string;
firstName: string;
lastName: string;
email: string;
phoneNumber: string;
carNumber: string;
brandName: string;
modelName: string;
fuelType: string;
transmisionType: string;
path: string;

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.id !== 0) {
      this.getBookingById();
    }
  }

getBookingById() {
  return this.bookingService.getBookingById(this.id).subscribe((booking: Booking) => {
    this.model = booking;
    this.bookingId = booking.id;
    this.pickUpDate = booking.pickUpDate;
    this.pickUpLocation = booking.pickUpLocation;
    this.returnDate = booking.returnDate;
    this.returnLocation = booking.returnLocation;
    this.firstName = booking.user.firstName;
    this.lastName = booking.user.lastName;
    this.email = booking.user.email;
    this.phoneNumber = booking.user.phoneNumber;
    this.carNumber = booking.car.carNumber;
    this.brandName = booking.car.brandName;
    this.modelName = booking.car.modelName;
    this.fuelType = booking.car.fuelType;
    this.transmisionType = booking.car.transmisionType;
    this.path = booking.car.path;
  }, error => {
    this.alertify.error(error.error);
  });
}

}
