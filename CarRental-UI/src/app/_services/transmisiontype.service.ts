import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransmisionType } from '../_models/TransmisionType';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TransmisiontypeService {
baseUrl = environment.apiUrl;

token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};
constructor(private http: HttpClient) { }


getTransmisionTypes(): Observable<TransmisionType []> {
  return this.http.get<TransmisionType[]>(this.baseUrl + 'admin/transmisiontype', this.httpOptions);
}


getFilteredTransmisionTypes(page?, itemsPerPage?): Observable<PaginatedResult<TransmisionType[]>> {

  const paginatedResult: PaginatedResult<TransmisionType[]> = new PaginatedResult<TransmisionType[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<TransmisionType[]>(this.baseUrl + 'admin/transmisiontype/transmisiontypes', { observe: 'response', params})
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
}
