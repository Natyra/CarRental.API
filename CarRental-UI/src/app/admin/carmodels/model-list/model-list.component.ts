import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModelList } from 'src/app/_models/ModelList';
import { BrandService } from 'src/app/_services/brand.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
models: ModelList[];
brandId = +this.route.snapshot.queryParamMap.get('brandId');
  constructor(private route: ActivatedRoute, private brandService: BrandService, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.brandId !== 0) {
      this.loadModels();
    }
  }

loadModels() {
return this.brandService.getModelsByBrandId(this.brandId).subscribe((models: ModelList[]) => {
this.models = models;
}, error => {
  this.alertify.error(error);
});
}


}
