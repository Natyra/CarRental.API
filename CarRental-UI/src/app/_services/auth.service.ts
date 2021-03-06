import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;


constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    })
  ) ;
}

loggedIn() {
  const token = localStorage.getItem('token');
  this.decodedToken = this.jwtHelper.decodeToken(token);
  return !this.jwtHelper.isTokenExpired(token);
}

hasBookingIdInSession() {
  const bookingId = sessionStorage.getItem('bookingId');
  console.log(bookingId);

  if (bookingId != null) {
    return true;
  } else {
      return false;
    }
}
}
