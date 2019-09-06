import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Car } from '../_models/car';
import { CarAdd } from '../_models/CarAdd';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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
  return this.http.get<Car[]>(this.baseUrl + 'admin/car');
}

getFilteredCars(page?, itemsPerPage?): Observable<PaginatedResult<Car[]>> {

  const paginatedResult: PaginatedResult<Car[]> = new PaginatedResult<Car[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Car[]>(this.baseUrl + 'admin/car/cars', { observe: 'response', params}) 
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

addCar(model: CarAdd) {
  return this.http.post(this.baseUrl + 'admin/car/add', model, this.httpOptions);
}

getCarById(id: number): Observable<CarAdd> {
  return this.http.get<CarAdd>(this.baseUrl + 'admin/car/' + id, this.httpOptions);
}

editCar(model: CarAdd, id: number) {
  return this.http.put(this.baseUrl + 'admin/car/edit/' + id, model, this.httpOptions);
}

deleteCar(id: number) {
  return this.http.delete(this.baseUrl + 'admin/car/delete/' + id, this.httpOptions);
}
}


