import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username: string;
  bookingId: string;
  hasBooking = false;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    if (this.loggedIn() === true) {
      this.username = this.authService.decodedToken.unique_name;
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
 }


logout() {
 localStorage.removeItem('token');
 this.alertify.message('logged out');
 this.router.navigate(['/']);
}

hasBookingId() {
  const bookingId = localStorage.getItem('bookingId');
  console.log(bookingId);
  if (bookingId !== null) {
    this.bookingId = bookingId;
    this.hasBooking = true;
    this.router.navigate(['/my-booking', bookingId]);
  } else {
    this.hasBooking = false;
    this.router.navigate(['/customer-login']);

  }
}

}
