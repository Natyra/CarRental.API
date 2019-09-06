import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarService } from 'src/app/_services/car.service';
import { Car } from 'src/app/_models/Car';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
cars: Car[];
modalRef: BsModalRef;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;


  constructor(private carService: CarService,  private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.laodCars();
  }

  laodCars() {
  this.carService.getCars(this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<Car[]>) => { 
    this.cars = res.result;
    this.currentPage = res.pagination.currentPage;
    this.totalItems = res.pagination.totalItems;
    this.totalPages = res.pagination.totalPages;
    this.itemsPerPage = res.pagination.itemsPerPage;
  }, error => {
   console.log(error);
  });
}

deleteCar(id: number) {
  return this.carService.deleteCar(id).subscribe((result: any) => {
    this.alertify.success(result.message);
    this.laodCars();
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
  this.laodCars();
}

}
