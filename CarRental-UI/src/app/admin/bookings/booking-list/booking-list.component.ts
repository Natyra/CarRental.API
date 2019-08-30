import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/_services/booking.service';
import { Booking } from 'src/app/_models/Booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
bookings: Booking[];
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
return this.bookingService.getBookings().subscribe((bookings: Booking[]) => {
this.bookings = bookings;
}, error => {
  console.log(error);
});
  }

}
