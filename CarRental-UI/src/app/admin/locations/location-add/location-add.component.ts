import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from 'src/app/_models/Location';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/_services/location.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  @Output() cancelAddCar = new EventEmitter();
addLocationForm: FormGroup;
model: Location;
  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createAddLocationForm();
  }

  addLocation() {
    if (this.addLocationForm.valid) {
      this.model = Object.assign({}, this.addLocationForm.value);
      this.locationService.addLocation(this.model).subscribe(() => {
        this.alertify.success('Location added successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/locations']);
      });
    }
  }

  createAddLocationForm() {
    this.addLocationForm = this.fb.group({
      zipCode: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  cancel() {
    this.cancelAddCar.emit(false);
    this.router.navigate(['/locations']);
  }

}
