import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from '../_models/Brand';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelList } from '../_models/ModelList';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
baseUrl = environment.apiUrl;
token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};

constructor(private http: HttpClient, private authService: AuthService) { }



getBrands(): Observable<Brand[]> {
  return this.http.get<Brand[]>(this.baseUrl + 'admin/brand', this.httpOptions);
}

getBrandById(id: number): Observable<Brand> {
  return this.http.get<Brand>(this.baseUrl + 'admin/brand/' + id, this.httpOptions);
}

getModelsByBrandId(brandId: number): Observable<ModelList[]> {
return this.http.get<ModelList[]>(this.baseUrl + 'admin/brand/models/' + brandId, this.httpOptions);
}

addBrand(model: Brand) {
  return this.http.post(this.baseUrl + 'admin/brand/add', model, this.httpOptions);
}
editBrand(model: Brand, id: number) {
  return this.http.put(this.baseUrl + 'admin/brand/edit/' + id, model, this.httpOptions);
}
}
