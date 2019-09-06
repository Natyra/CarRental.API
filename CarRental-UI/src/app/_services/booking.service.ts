import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../_models/Booking';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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


getBookings(page?, itemsPerPage?): Observable<PaginatedResult<Booking[]>> {
  const paginatedResult: PaginatedResult<Booking[]> = new PaginatedResult<Booking[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
    
    return this.http.get<Booking[]>(this.baseUrl + 'admin/booking', { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
    })
    );
}
}

deleteBooking(id: number) {
  return this.http.delete(this.baseUrl + 'admin/booking/delete/' + id, this.httpOptions);
}
}
