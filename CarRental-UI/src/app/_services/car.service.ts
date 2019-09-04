import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Car } from '../_models/car';
import { CarAdd } from '../_models/CarAdd';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = environment.apiUrl;

  token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};

constructor(private http: HttpClient) { }

getCars(): Observable<Car[]> {
  return this.http.get<Car[]>(this.baseUrl + 'admin/car', this.httpOptions);
}

addCar(model: CarAdd) {
  return this.http.post(this.baseUrl + 'admin/car/add', model, this.httpOptions);
}

getCarById(id: number): Observable<CarAdd> {
  return this.http.get<CarAdd>(this.baseUrl + 'admin/car/' + id, this.httpOptions);
}

editCar(model: CarAdd, id: number) {
  return this.http.put(this.baseUrl + 'admin/car/edit/' + id, model, this.httpOptions);
}
}


