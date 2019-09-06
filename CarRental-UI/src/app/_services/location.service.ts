import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../_models/Location';
import { environment } from 'src/environments/environment';


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
