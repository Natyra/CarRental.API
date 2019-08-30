import { Component, OnInit } from '@angular/core';
import { CarService } from '../_services/car.service';
import { Car } from '../_models/Car';

@Component({
  selector: 'app-car-fleet',
  templateUrl: './car-fleet.component.html',
  styleUrls: ['./car-fleet.component.css']
})
export class CarFleetComponent implements OnInit {
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
