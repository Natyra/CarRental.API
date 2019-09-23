import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

sendContactEmail(model: Contact) {
return this.http.post(this.baseUrl + 'home/contact', model);
}

}
