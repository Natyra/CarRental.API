import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';
import { Location } from 'src/app/_models/Location';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
locations: Location[];
modalRef: BsModalRef;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;

  constructor(private locationService: LocationService, private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadFilteredLocations();
  }

  loadFilteredLocations() {
 this.locationService.getFilteredLocations().subscribe((res: PaginatedResult<Location[]>) => {
  this.locations = res.result;
  this.currentPage = res.pagination.currentPage;
  this.totalItems = res.pagination.totalItems;
  this.totalPages = res.pagination.totalPages;
  this.itemsPerPage = res.pagination.itemsPerPage;
}, error => {
  console.log(error);
});
  }

  deleteCar(id: number) {
    return this.locationService.deleteLocation(id).subscribe((result:any) => {
      this.alertify.success(result.message);
      this.loadFilteredLocations();
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

  pageChanged(event: any): void {
    this.currentPage = event;
    this.loadFilteredLocations();
  }
}
