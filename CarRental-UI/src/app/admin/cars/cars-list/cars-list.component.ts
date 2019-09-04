import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarService } from 'src/app/_services/car.service';
import { Car } from 'src/app/_models/Car';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
cars: Car[];
modalRef: BsModalRef;

  constructor(private carService: CarService,  private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
  this.carService.getCars().subscribe((cars: Car[]) => {
    this.cars = cars;
  }, error => {
   console.log(error);
  });
}

deleteCar(id: number) {
  return this.carService.deleteCar(id).subscribe((result:any) => {
    this.alertify.success(result.message);
    this.loadCars();
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
