import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  locationId = this.route.snapshot.queryParamMap.get('pickUpLocationId');
  pickUpDate = this.route.snapshot.queryParamMap.get('pickUpDate');
  returnDate = this.route.snapshot.queryParamMap.get('returnDate');
  rLocationId = this.route.snapshot.queryParamMap.get('returnLocationId');
  age = this.route.snapshot.queryParamMap.get('age');

constructor(private route: ActivatedRoute) { }

isValidSearch() {
  if(this.locationId !== null && this.locationId !== undefined && this.locationId !== '0' && this.locationId !== 'NaN' && this.pickUpDate !== null && this.pickUpDate !== undefined && this.pickUpDate !== 'NaN'  && this.returnDate !== null && this.returnDate !== undefined && this.returnDate !== 'NaN' ) {
    return true;
  } else {
    return false;
  }
}

}
