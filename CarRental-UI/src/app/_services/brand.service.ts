import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../_models/Brand';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }


getLocations(): Observable<Brand[]> {
return this.http.get<Brand[]>(this.baseUrl + 'admin/brand');
}
}
