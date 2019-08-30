import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/_services/car.service';
import { Car } from 'src/app/_models/Car';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
cars: Car[];
  constructor(private carService: CarService) { }

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

}
