import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuelType } from '../_models/fueltype';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FueltypeService {
baseUrl = environment.apiUrl;

token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};

constructor(private http: HttpClient) { }

getFuelTypes(): Observable<FuelType[]> {
  return this.http.get<FuelType[]>(this.baseUrl + 'admin/fueltype', this.httpOptions);
}

getFuelTypeById(id: number): Observable<FuelType> {
  return this.http.get<FuelType>(this.baseUrl + 'admin/fueltype/' + id, this.httpOptions);
}

addFuelType(model: FuelType) {
  return this.http.post(this.baseUrl + 'admin/fueltype/add', model, this.httpOptions);
}

editFuelType(id: number, model: FuelType) {
  return this.http.put(this.baseUrl + 'admin/fueltype/edit/' + id, model, this.httpOptions);
}

deleteFuelType(id: number) {
  return this.http.delete(this.baseUrl + 'admin/fueltype/delete/' + id, this.httpOptions);
}
}
