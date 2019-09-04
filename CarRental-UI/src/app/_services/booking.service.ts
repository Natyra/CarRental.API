import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../_models/Booking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
baseUrl = environment.apiUrl;
token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};

constructor(private http: HttpClient) { }


getBookings(): Observable<Booking[]> {
  return this.http.get<Booking[]>(this.baseUrl + 'admin/booking', this.httpOptions);
}
}
