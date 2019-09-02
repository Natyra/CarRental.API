import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransmisionType } from '../_models/TransmisionType';

@Injectable({
  providedIn: 'root'
})
export class TransmisiontypeService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }


getTransmisionTypes(): Observable<TransmisionType []> {
  return this.http.get<TransmisionType[]>(this.baseUrl + 'admin/transmisiontype');
}
}
