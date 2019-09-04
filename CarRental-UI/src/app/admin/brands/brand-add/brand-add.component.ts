import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from 'src/app/_models/Brand';
import { BrandService } from 'src/app/_services/brand.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  @Output() cancelAddBrand = new EventEmitter();
addBrandForm: FormGroup;
model: Brand;
brandName;

  constructor(private fb: FormBuilder, private brandService: BrandService, private alertify: AlertifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createAddBrandForm();
    this.getBrnadById();
  }

createAddBrandForm() {
    this.addBrandForm = this.fb.group({
      name: ['', Validators.required]
    });
}

getBrnadById() {
  const id = +this.route.snapshot.paramMap.get('id');
  if (id !== 0) {
  this.brandService.getBrandById(id).subscribe((brand: Brand) => {
      this.brandName = brand.name;
    }, error => {
      this.alertify.error(error);
    });
  } else {
    this.brandName = '';
  }
}

addBrand() {
  if (this.addBrandForm.valid) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.model = Object.assign({}, this.addBrandForm.value);
    if (id === 0) {
      this.brandService.addBrand(this.model).subscribe((result: any) => {
        this.alertify.success(result.message);
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/brands']);
      });
    } else {
      this.brandService.editBrand(this.model, id).subscribe((result: any) => {
        this.alertify.success(result.message);
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/brands']);
      });
    }
  }
}

cancel() {
  this.cancelAddBrand.emit(false);
  this.router.navigate(['/brands']);
}
}
