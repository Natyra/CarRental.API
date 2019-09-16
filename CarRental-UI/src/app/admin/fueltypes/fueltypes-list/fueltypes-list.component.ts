import { Component, OnInit, TemplateRef } from '@angular/core';
import { FueltypeService } from 'src/app/_services/fueltype.service';
import { FuelType } from 'src/app/_models/fueltype';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-fueltypes-list',
  templateUrl: './fueltypes-list.component.html',
  styleUrls: ['./fueltypes-list.component.css']
})
export class FueltypesListComponent implements OnInit {
fuelTypes: FuelType[];
modalRef: BsModalRef;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;
  constructor(private fuelTypeService: FueltypeService, private modalService: BsModalService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadFilteredFuelTypes();
  }

loadFilteredFuelTypes() {
this.fuelTypeService.getFilteredCars(this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<FuelType[]>) => {
  this.fuelTypes = res.result;
  this.currentPage = res.pagination.currentPage;
  this.itemsPerPage = res.pagination.itemsPerPage;
  this.totalItems = res.pagination.totalItems;
  this.totalPages = res.pagination.totalPages;
}, error =>{
console.log(error);
});
}

deleteFuelType(id: number) {
  return this.fuelTypeService.deleteFuelType(id).subscribe((result: any) => {
    this.alertify.success(result.message);
    this.loadFilteredFuelTypes();
  }, error => {
    this.alertify.error(error.error);
  }, () => {
    this.router.navigate(['/admin/fuel']);
  })
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
}
confirm(id: number): void {
 this.deleteFuelType(id);
 this.modalRef.hide();
}
decline(): void {
  this.modalRef.hide();
}

pageChanged(event: any): void {
  this.currentPage = event;
  this.loadFilteredFuelTypes();
}
}
