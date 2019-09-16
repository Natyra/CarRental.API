import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/_models/Brand';
import { BrandService } from 'src/app/_services/brand.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
brands: Brand[];
modalRef: BsModalRef;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;

  constructor(private brandService: BrandService, private modalService: BsModalService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadFilteredBrands();
  }

  loadFilteredBrands() {
this.brandService.getFilteredBrands(this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<Brand[]>) => {
  this.brands = res.result;
  this.currentPage = res.pagination.currentPage;
  this.itemsPerPage = res.pagination.itemsPerPage;
  this.totalItems = res.pagination.totalItems;
  this.totalPages = res.pagination.totalPages;
}, error => {
console.log(error);
});
  }

  deleteBrand(id: number) {
    return this.brandService.deleteBrand(id).subscribe((result: any) => {
      this.alertify.success(result.message);
      this.loadFilteredBrands();
    }, error => {
      this.alertify.error(error.error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(id: number): void {
   this.deleteBrand(id);
   this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.loadFilteredBrands();
  }

}
