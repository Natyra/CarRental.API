import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModelList } from 'src/app/_models/ModelList';
import { BrandService } from 'src/app/_services/brand.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
models: ModelList[];
brandId = +this.route.snapshot.queryParamMap.get('brandId');

currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;

  constructor(private route: ActivatedRoute, private brandService: BrandService, private alertify: AlertifyService, private  modelService: CarmodelService) { }

  ngOnInit() {
    if (this.brandId !== 0) {
      this.loadFilteredModels();
    }
  }

loadFilteredModels() {
return this.modelService.getfilteredModelsByBrandId(this.brandId, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<ModelList[]>) => {
this.models = res.result;
this.currentPage = res.pagination.currentPage;
this.itemsPerPage = res.pagination.itemsPerPage;
this.totalItems = res.pagination.totalItems;
this.totalPages = res.pagination.totalPages;
}, error => {
  this.alertify.error(error);
});
}

pageChanged(event: any): void {
  this.currentPage = event;
  this.loadFilteredModels();
}

}
