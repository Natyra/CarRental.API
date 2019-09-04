import { Component, OnInit, TemplateRef } from '@angular/core';
import { FueltypeService } from 'src/app/_services/fueltype.service';
import { FuelType } from 'src/app/_models/fueltype';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fueltypes-list',
  templateUrl: './fueltypes-list.component.html',
  styleUrls: ['./fueltypes-list.component.css']
})
export class FueltypesListComponent implements OnInit {
fuelTypes: FuelType[];
modalRef: BsModalRef;
  constructor(private fuelTypeService: FueltypeService, private modalService: BsModalService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadFuelTypes();
  }

loadFuelTypes() {
this.fuelTypeService.getFuelTypes().subscribe((fuel: FuelType[]) => {
  this.fuelTypes = fuel;
}, error =>{
console.log(error);
});
}

deleteFuelType(id: number) {
  return this.fuelTypeService.deleteFuelType(id).subscribe((result: any) => {
    this.alertify.success(result.message);
    this.loadFuelTypes();
  }, error => {
    this.alertify.error(error);
  }, () => {
    this.router.navigate(['/fuel']);
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
}
