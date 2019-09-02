import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../_models/Brand';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelList } from '../_models/ModelList';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }


getBrands(): Observable<Brand[]> {
return this.http.get<Brand[]>(this.baseUrl + 'admin/brand');
}

getModelsByBrandId(brandId: number): Observable<ModelList[]> {
return this.http.get<ModelList[]>(this.baseUrl + 'admin/brand/models/' + brandId);
}
}
