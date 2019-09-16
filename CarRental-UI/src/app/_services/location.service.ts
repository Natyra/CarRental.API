import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../_models/Location';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
baseUrl = environment.apiUrl;

token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};
constructor(private http: HttpClient) { }

getLocations(): Observable<Location[]> {
  return this.http.get<Location[]>(this.baseUrl + 'admin/location', this.httpOptions);
}

getFilteredLocations(page?, itemsPerPage?): Observable<PaginatedResult<Location[]>> {

  const paginatedResult: PaginatedResult<Location[]> = new PaginatedResult<Location[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Location[]>(this.baseUrl + 'admin/location/locations', { observe: 'response', params})
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

getLocationsForList(): Observable<Location[]> {
  return this.http.get<Location[]>(this.baseUrl + 'home/locations');
}

getLocationById(id: number): Observable<Location> {
  return this.http.get<Location>(this.baseUrl + 'admin/location/' + id, this.httpOptions);
}

addLocation(model: Location) {
  return this.http.post(this.baseUrl + 'admin/location/add', model, this.httpOptions);
}

editLocation(id: number, model: Location) {
  return this.http.put(this.baseUrl + 'admin/location/edit/' + id, model, this.httpOptions);
}

deleteLocation(id: number) {
  return this.http.delete(this.baseUrl + 'admin/location/delete/' + id, this.httpOptions);
}
}
