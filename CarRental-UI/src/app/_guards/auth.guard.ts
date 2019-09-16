import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate(): boolean {
    const bookingId = sessionStorage.getItem('bookingId');
    console.log(bookingId);
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You are not loggedin');
    this.router.navigate(['/home']);
    return false;
  }
}
