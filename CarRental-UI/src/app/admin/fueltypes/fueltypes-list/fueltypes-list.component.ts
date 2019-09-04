import { Component, OnInit } from '@angular/core';
import { FueltypeService } from 'src/app/_services/fueltype.service';
import { FuelType } from 'src/app/_models/fueltype';

@Component({
  selector: 'app-fueltypes-list',
  templateUrl: './fueltypes-list.component.html',
  styleUrls: ['./fueltypes-list.component.css']
})
export class FueltypesListComponent implements OnInit {
fuelTypes: FuelType[];
  constructor(private fuelTypeService: FueltypeService) { }

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
}
