import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { Location } from '../_models/Location';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
locations: Location[];
dp;
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationsList();
    this.dp = new Date().getUTCFullYear() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDate();
    console.log(this.dp);
  }

  locationsList() {
    this.locationService.getLocationsForList().subscribe((locations: Location[]) => {
this.locations = locations;
    }, error => {
      console.log(error);
    });
  }

  get today() {
    return new Date();
  }

}
