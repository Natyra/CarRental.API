import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/_models/Brand';
import { BrandService } from 'src/app/_services/brand.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
brands: Brand[];
modalRef: BsModalRef;
  constructor(private brandService: BrandService, private modalService: BsModalService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
this.brandService.getBrands().subscribe((brands: Brand[]) => {
  this.brands = brands;
}, error => {
console.log(error);
});
  }

  deleteBrand(id: number) {
    return this.brandService.deleteBrand(id).subscribe((result: any) => {
      this.alertify.success(result.message);
      this.loadBrands();
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/brands']);
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

}
