import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelList } from 'src/app/_models/ModelList';
import { ActivatedRoute, Router } from '@angular/router';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { BrandService } from 'src/app/_services/brand.service';
import { Brand } from 'src/app/_models/Brand';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.css']
})
export class ModelAddComponent implements OnInit {
  @Output() cancelAddBrand = new EventEmitter();
addModelForm: FormGroup;
model: ModelList;
brands: Brand[];
addOrEditMessage: string;
brandName: string;
modelName = '';
brandId = +this.route.snapshot.queryParamMap.get('brandId');
id = +this.route.snapshot.queryParamMap.get('id');
  constructor(private route: ActivatedRoute, private modelService: CarmodelService, private fb: FormBuilder, private brandService: BrandService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.createModelForm();
    this.getBrands();
    if (this.id !== 0) {
      this.getModelById();
      this.addOrEditMessage = 'Edit model for ';
    } else {
      this.addOrEditMessage = 'Add model for ';
    }
  }

  createModelForm() {
    this.addModelForm = this.fb.group({
      brandId: [this.brandId, Validators.required],
      name: ['', Validators.required]
    });
  }

getBrands() {
return this.brandService.getBrands().subscribe((brands: Brand[]) => {
  this.brands = brands;
  const brand = this.brands.find(x => x.id === this.brandId);
  if (brand !== undefined) {
  this.brandName = brand.name;
  this.addOrEditMessage += this.brandName;
  }

}, error => {
  this.alertify.error(error);
});
}



getModelById() {
  if (this.id !== 0) {
    this.modelService.getModelById(this.id).subscribe((model: ModelList) => {
      this.modelName = model.name;
    }, error => {
      this.alertify.error(error);
    });
  }
}




addModel() {
  console.log(this.addModelForm.value);
  if (this.addModelForm.valid) {
    this.model = Object.assign({}, this.addModelForm.value);

    if (this.id === 0) {
      this.modelService.addModel(this.model).subscribe((result: any) => {
        this.alertify.success(result.message);
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/admin/models/'], { queryParams: { brandId: this.brandId } });
      });
    } else {
      this.modelService.editModel(this.id, this.model).subscribe((result: any) => {
        this.alertify.success(result.message);
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/admin/models/'], { queryParams: { brandId: this.brandId } });
      });
    }
  }
}

cancel() {
  this.cancelAddBrand.emit(false);
  this.router.navigate(['/admin/models/'], { queryParams: { brandId: this.brandId } });
}
}
