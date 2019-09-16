import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuelType } from 'src/app/_models/fueltype';
import { FueltypeService } from 'src/app/_services/fueltype.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fueltypes-add',
  templateUrl: './fueltypes-add.component.html',
  styleUrls: ['./fueltypes-add.component.css']
})
export class FueltypesAddComponent implements OnInit {
  @Output() cancelAddBrand = new EventEmitter();
addFuelForm: FormGroup;
model: FuelType;
fuelTypeName = '';
id = +this.route.snapshot.paramMap.get('id');
  constructor(private fb: FormBuilder, private fuelService: FueltypeService, private alertify: AlertifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createFuelForm();
    if (this.id !== 0) {
      this.getFuelTypeById();
    }
  }


  createFuelForm() {
    this.addFuelForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addFueltype() {
    if (this.addFuelForm.valid) {
      this.model = Object.assign({}, this.addFuelForm.value);
      if (this.id === 0) {
        this.fuelService.addFuelType(this.model).subscribe((result: any) => {
          this.alertify.success(result.message);
        }, error => {
            this.alertify.error(error.error);
        }, () => {
          this.router.navigate(['/admin/fuel']);
        });
      } else {
        this.fuelService.editFuelType(this.id, this.model).subscribe((result: any) => {
          this.alertify.success(result.message);
        }, error => {
          this.alertify.error(error.error);
        }, () => {
            this.router.navigate(['/admin/fuel']);
        });
      }
    }
  }

  getFuelTypeById() {
    if (this.id !== 0) {
      this.fuelService.getFuelTypeById(this.id).subscribe((fuel: FuelType) => {
        this.fuelTypeName = fuel.name;
      }, error => {
        this.alertify.error(error.error);
      });
    } else {
      this.fuelTypeName = '';
    }
  }

  cancel() {
    this.cancelAddBrand.emit(false);
    this.router.navigate(['/admin/fuel']);
  }
}
