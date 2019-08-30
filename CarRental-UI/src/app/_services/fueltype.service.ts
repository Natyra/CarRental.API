import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuelType } from '../_models/fueltype';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FueltypeService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getFuelTypes(): Observable<FuelType[]> {
  return this.http.get<FuelType[]>(this.baseUrl + 'admin/fueltype');
}
}
