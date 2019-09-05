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
import { Router, ActivatedRoute } from '@angular/router';
import { ModelList } from 'src/app/_models/ModelList';
import { Car } from 'src/app/_models/car';

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

carNumber = '';
brandId = 0;
modelId = 0;
modelYear = '';
fuelTypeId = 0;
transmisionTypeId = 0;
numberOfDoors = 0;
carCapacity = 0;
carColor = '';
priceForDay = 0;
carLocationId = 0;
description = '';

id = +this.route.snapshot.paramMap.get('id');

constructor(private carService: CarService, private alertify: AlertifyService, private brandService: BrandService, private fuelTypeService: FueltypeService, private transmisionTypeService: TransmisiontypeService, private locationService: LocationService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.id !== 0) {
    this.getCarById();
    }
    this.createAddCarForm();
    this.getBrands();
    this.getFuelTypes();
    this.getTransmisionTypes();
    this.getLocations();

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

getCarById() {
  this.carService.getCarById(this.id).subscribe((car: CarAdd) => {
    this.model = car;
    this.getModelsByBrandId(car.brandId);
    this.carNumber = car.carNumber;
    this.brandId = car.brandId;
    this.modelId = car.modelId;
    this.modelYear = car.modelYear;
    this.fuelTypeId = car.fuelTypeId;
    this.transmisionTypeId = car.transmisionTypeId;
    this.numberOfDoors = car.numberOfDoors;
    this.carCapacity = car.carCapacity;
    this.carColor = car.carColor;
    this.priceForDay = car.priceForDay;
    this.carLocationId =  car.carLocationId;
    this.description = car.description;

    this.addCarForm = this.fb.group({
      carNumber: [car.carNumber, Validators.required],
      brandId: [car.brandId, Validators.required],
      modelId: [car.modelId, Validators.required],
      modelYear: [car.modelYear, Validators.required],
      fuelTypeId: [car.fuelTypeId, Validators.required],
      transmisionTypeId: [car.transmisionTypeId, Validators.required],
      numberOfDoors: [car.numberOfDoors, Validators.required],
      carCapacity: [car.carCapacity, Validators.required],
      carColor: [car.carColor, Validators.required],
      priceForDay: [car.priceForDay, Validators.required],
      carLocationId: [car.carLocationId, Validators.required],
      description: [car.description],
    });

  }, error => {
    this.alertify.error(error);
  });
}

addCar() {
  if (this.addCarForm.valid) {
    this.model = Object.assign({}, this.addCarForm.value);
    if (this.id === 0) {
    this.carService.addCar(this.model).subscribe(() => {
      this.alertify.success('Car added successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/admin/cars']);
    });
  } else {
    this.carService.editCar(this.model, this.id).subscribe((result: any) => {
      this.alertify.success(result.message);
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/admin/cars']);
    });
  }
  }
}


cancel() {
  this.cancelAddCar.emit(false);
  this.router.navigate(['/admin/cars']);
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
