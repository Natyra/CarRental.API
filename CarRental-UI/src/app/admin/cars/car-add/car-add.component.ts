import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CarService } from 'src/app/_services/car.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CarAdd } from 'src/app/_models/CarAdd';
import { Brand } from 'src/app/_models/Brand';
import { BrandService } from 'src/app/_services/brand.service';
import { FueltypeService } from 'src/app/_services/fueltype.service';
import { FuelType } from 'src/app/_models/fueltype';
import { Location } from 'src/app/_models/Location';
import { TransmisiontypeService } from 'src/app/_services/transmisiontype.service';
import { TransmisionType } from 'src/app/_models/TransmisionType';
import { LocationService } from 'src/app/_services/location.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelList } from 'src/app/_models/ModelList';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  @Output() cancelAddCar = new EventEmitter();
addCarForm: FormGroup;

model: CarAdd;
brands: Brand[];
fuelTypes: FuelType[];
transmisionTypes: TransmisionType[];
locations: Location[];
models: ModelList[];
  constructor(private carService: CarService, private alertify: AlertifyService, 
    private brandService: BrandService, private fuelTypeService: FueltypeService, 
    private transmisionTypeService: TransmisiontypeService, private locationService: LocationService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createAddCarForm();
    this.getBrands();
    this.getFuelTypes();
    this.getTransmisionTypes();
    this.getLocations();
    // this.addCarForm = new FormGroup({
    //   carNumber: new FormControl('', Validators.required),
    //   brandId: new FormControl('', Validators.required),
    //   modelId: new FormControl('', Validators.required),
    //   modelYear:  new FormControl('', Validators.required),
    //   fuelTypeId:  new FormControl('', Validators.required),
    //   transmisionTypeId:  new FormControl('', Validators.required),
    //   numberOfDoors:  new FormControl('', Validators.required),
    //   carCapacity:  new FormControl('', Validators.required),
    //   carColor:  new FormControl('', Validators.required),
    //   priceForDay:  new FormControl('', Validators.required),
    //   carLocationId:  new FormControl('', Validators.required),
    //   description:  new FormControl(),
    // });
  }

createAddCarForm() {
  this.addCarForm = this.fb.group({
    carNumber: ['', Validators.required],
    brandId: ['', Validators.required],
    modelId: ['', Validators.required],
    modelYear: ['', Validators.required],
    fuelTypeId: ['', Validators.required],
    transmisionTypeId: ['', Validators.required],
    numberOfDoors: ['', Validators.required],
    carCapacity: ['', Validators.required],
    carColor: ['', Validators.required],
    priceForDay: ['', Validators.required],
    carLocationId: ['', Validators.required],
    description: [''],
  });
}

addCar() {
  if (this.addCarForm.valid) {
    this.model = Object.assign({}, this.addCarForm.value);
    this.carService.addCar(this.model).subscribe(() => {
      this.alertify.success('Car added successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/cars']);
    });
  }
}

cancel() {
  this.cancelAddCar.emit(false);
  this.router.navigate(['/cars']);
}

getBrands() {
  this.brandService.getBrands().subscribe((brands: Brand[]) => {
    this.brands = brands;
  }, error =>{
    this.alertify.error(error);
  });
}

getFuelTypes() {
this.fuelTypeService.getFuelTypes().subscribe((fuelTypes: FuelType[]) =>{
  this.fuelTypes = fuelTypes;
}, error => {
  this.alertify.error(error);
});
}

getTransmisionTypes() {
  this.transmisionTypeService.getTransmisionTypes().subscribe((types: TransmisionType[]) => {
    this.transmisionTypes = types;
  }, error => {
    this.alertify.error(error);
  });
}

getLocations() {
this.locationService.getLocations().subscribe((locations: Location[]) => {
  this.locations = locations;
}, error => {
this.alertify.error(error);
});
}

getModelsByBrandId(brandId: number) {
  this.brandService.getModelsByBrandId(brandId).subscribe((models: ModelList[]) => {
this.models = models;
  }, error => {
    this.alertify.error(error);
  });
}
}
