import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FuelType } from '../_models/fueltype';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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

getFilteredCars(page?, itemsPerPage?): Observable<PaginatedResult<FuelType[]>> {

  const paginatedResult: PaginatedResult<FuelType[]> = new PaginatedResult<FuelType[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<FuelType[]>(this.baseUrl + 'admin/fueltype/fueltypes', { observe: 'response', params})
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
