import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ModelList } from '../_models/ModelList';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarmodelService {
  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');
  headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  httpOptions = {
    headers: this.headersObj
  };
constructor(private http: HttpClient) { }

getModelById(id: number): Observable<ModelList> {
  return this.http.get<ModelList>(this.baseUrl + 'admin/model/' + id, this.httpOptions);
}

getfilteredModelsByBrandId(brandId: number, page?, itemsPerPage?): Observable<PaginatedResult<ModelList[]>> {

  const paginatedResult: PaginatedResult<ModelList[]> = new PaginatedResult<ModelList[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<ModelList[]>(this.baseUrl + 'admin/model/models/' + brandId, { observe: 'response', params})
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

addModel(model: ModelList) {
  return this.http.post(this.baseUrl + 'admin/model/add', model, this.httpOptions);
}

editModel(id: number, model: ModelList) {
  return this.http.put(this.baseUrl + 'admin/model/edit/' + id, model, this.httpOptions);
}
}
