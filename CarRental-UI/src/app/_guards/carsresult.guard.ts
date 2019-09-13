import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { GeneralService } from '../_services/general.service';

@Injectable({
  providedIn: 'root'
})
export class CarsResultGuard implements CanActivate {
  constructor(private generalService: GeneralService, private router: Router, private alertify: AlertifyService) {}


    canActivate(): boolean {
        if (this.generalService.isValidSearch()) {
            return true;
        } else {
            this.alertify.message('Search for car');
            this.router.navigate(['/']);
        }
    }
}
