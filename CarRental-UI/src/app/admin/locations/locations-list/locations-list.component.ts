import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';
import { Location } from 'src/app/_models/Location';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
locations: Location[];
modalRef: BsModalRef;
  constructor(private locationService: LocationService, private modalService: BsModalService, private alertify: AlertifyService) { }

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

  deleteCar(id: number) {
    return this.locationService.deleteLocation(id).subscribe((result:any) => {
      this.alertify.success(result.message);
      this.loadLocations();
    }, error => {
      this.alertify.error(error);
    });
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(id: number): void {
   this.deleteCar(id);
   this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }
}
