import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;

token = localStorage.getItem('token');
headersObj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
httpOptions = {
  headers: this.headersObj
};
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'admin/user');
}

getUserById(id: string): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'admin/user/' + id);
}

getFilteredUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {

  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<User[]>(this.baseUrl + 'admin/user/users', { observe: 'response', params})
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

deleteUser(id: string) {
  return this.http.delete(this.baseUrl + 'admin/user/delete/' + id, this.httpOptions);
}

addCustomer(model: User) {
  return this.http.post(this.baseUrl + 'booking/addcustomer', model);
}
}



