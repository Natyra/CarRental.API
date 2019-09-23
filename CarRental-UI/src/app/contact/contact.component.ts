import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../_services/contact.service';
import { Contact } from '../_models/Contact';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contactForm: FormGroup;
model: Contact;
  constructor(private fb: FormBuilder, private contactService: ContactService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['',Validators.required],
      contactMessage: ['']

    });
  }

  sendContactEmail() {
    if (this.contactForm.valid) {
      this.model = Object.assign({}, this.contactForm.value);
      return this.contactService.sendContactEmail(this.model).subscribe((result: any) => {
      this.alertify.success(result.message);
    }, error => {
        this.alertify.error(error.error);
    } );
    }
  }
}
