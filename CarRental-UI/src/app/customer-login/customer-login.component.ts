import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../_services/booking.service';
import { UserBooking } from '../_models/UserBooking';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  customerLoginForm: FormGroup;
  model: UserBooking;

  constructor(private fb: FormBuilder, private bookingService: BookingService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.customerLogin();
  }

  customerLogin() {
    this.customerLoginForm = this.fb.group({
      email: ['', Validators.required],
      bookingId: ['', Validators.required]
    });
  }

  login() {

    if (this.customerLoginForm.valid) {
    this.model = Object.assign({}, this.customerLoginForm.value);
    this.bookingService.isUserValid(this.model).subscribe((result: any) => {
      if (result.isValidUser) {
        localStorage.setItem('bookingId', this.model.bookingId.toString());
         this.router.navigate(['/my-booking/', this.model.bookingId]);
         this.alertify.success('My booking');
      } else {
          this.alertify.error('Email or booking Id is not valid');
      }
    }, error => {
      this.alertify.error(error.error);
    });
  }
}
  cancel() {

  }

}
