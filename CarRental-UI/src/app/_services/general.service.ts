import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  carId = this.route.snapshot.queryParamMap.get('carId');
  pb = this.route.snapshot.queryParamMap.get('pb');

constructor(private route: ActivatedRoute) { }

isValidSearch() {
  if(this.carId !== null && this.carId !== undefined && this.carId !== '0' && this.carId !== 'NaN' && this.pb !== null && this.pb !== undefined && this.pb !== 'NaN' ) {
    return true;
  } else {
    return false;
  }
}

}
