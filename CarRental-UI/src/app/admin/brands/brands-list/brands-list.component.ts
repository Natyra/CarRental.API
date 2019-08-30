import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/_models/Brand';
import { BrandService } from 'src/app/_services/brand.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
brands: Brand[];
  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
this.brandService.getLocations().subscribe((brands: Brand[]) => {
  this.brands = brands;
}, error => {
console.log(error);
});
  }

}
