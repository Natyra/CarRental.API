import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ModelList } from '../_models/ModelList';
import { Observable } from 'rxjs';

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

addModel(model: ModelList) {
  return this.http.post(this.baseUrl + 'admin/model/add', model, this.httpOptions);
}

editModel(id: number, model: ModelList) {
  return this.http.put(this.baseUrl + 'admin/model/edit/' + id, model, this.httpOptions);
}
}
