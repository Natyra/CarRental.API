import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from 'src/app/_models/Location';
import { Router, ActivatedRoute } from '@angular/router';
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
zipCode = '';
streetAddress = '';
city = '';
country = '';

id = +this.route.snapshot.paramMap.get('id');

  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createAddLocationForm();

    if (this.id !== 0) {
      this.getLocationById();
    }
  }

  addLocation() {
    if (this.addLocationForm.valid) {
      this.model = Object.assign({}, this.addLocationForm.value);
      console.log(this.id);
      if (this.id === 0) {
      this.locationService.addLocation(this.model).subscribe((result: any) => {
        this.alertify.success(result.message);
      }, error => {
        this.alertify.error(error.error);
      }, () => {
        this.router.navigate(['/admin/locations']);
      });
    } else {
      this.locationService.editLocation(this.id, this.model).subscribe((result: any) => {
        this.alertify.success(result.message);
      }, error => {
        this.alertify.error(error.error);
      }, () => {
        this.router.navigate(['/admin/locations']);
      });
    }
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

  getLocationById() {
    this.locationService.getLocationById(this.id).subscribe((location: Location) => {
      this.streetAddress = location.streetAddress;
      this.city = location.city;
      this.zipCode = location.zipCode;
      this.country = location.country;

      this.addLocationForm = this.fb.group({
        zipCode: [location.zipCode, Validators.required],
      streetAddress: [location.streetAddress, Validators.required],
      city: [location.city, Validators.required],
      country: [location.country, Validators.required]
      });
    }, error => {
      this.alertify.error(error.error);
    });
  }

  cancel() {
    this.cancelAddCar.emit(false);
    this.router.navigate(['/admin/locations']);
  }

}
