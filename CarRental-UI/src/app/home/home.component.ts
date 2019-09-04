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
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationsList();
  }

  locationsList() {
    this.locationService.getLocations().subscribe((locations: Location[]) => {
this.locations = locations;
    }, error => {
      console.log(error);
    });
  }

}
