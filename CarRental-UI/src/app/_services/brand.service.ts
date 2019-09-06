import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Brand } from '../_models/Brand';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelList } from '../_models/ModelList';
import { AuthService } from './auth.service';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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

getFilteredBrands(page?, itemsPerPage?): Observable<PaginatedResult<Brand[]>> {

  const paginatedResult: PaginatedResult<Brand[]> = new PaginatedResult<Brand[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Brand[]>(this.baseUrl + 'admin/brand/brands', { observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
      }
      return paginatedResult;
  })
  );
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

deleteBrand(id: number) {
  return this.http.delete(this.baseUrl + 'admin/brand/delete/' + id, this.httpOptions);
}
}
