import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';
import { Location } from 'src/app/_models/Location';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
locations: Location[];
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
 this.locationService.getLocations().subscribe((locations: Location[]) => {
  this.locations = locations;
}, error => {
  console.log(error);
});
  }
}
