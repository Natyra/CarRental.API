import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class BookingGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate(): boolean {
    if (this.authService.hasBookingIdInSession()) {
        return true;
      } else {
        this.alertify.message('Enter email and booking number to see your booking details');
        this.router.navigate(['/customer-login']);
        return false;
      }
    }
}
