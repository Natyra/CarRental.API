import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { appRoutes } from './routes';
import {NgbModule, NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CarsListComponent } from './admin/cars/cars-list/cars-list.component';
import { CarService } from './_services/car.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { BookingListComponent } from './admin/bookings/booking-list/booking-list.component';
import { BrandsListComponent } from './admin/brands/brands-list/brands-list.component';
import { LocationsListComponent } from './admin/locations/locations-list/locations-list.component';
import { FueltypesListComponent } from './admin/fueltypes/fueltypes-list/fueltypes-list.component';
import { BookingService } from './_services/booking.service';
import { BrandService } from './_services/brand.service';
import { LocationService } from './_services/location.service';
import { FueltypeService } from './_services/fueltype.service';
import { FooterComponent } from './footer/footer.component';
import { CarFleetComponent } from './car-fleet/car-fleet.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { CarAddComponent } from './admin/cars/car-add/car-add.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      AdminNavComponent,
      NavComponent,
      HomeComponent,
      CarsListComponent,
      UserListComponent,
      BookingListComponent,
      BrandsListComponent,
      LocationsListComponent,
      FueltypesListComponent,
      FooterComponent,
      CarFleetComponent,
      LoginComponent,
      CarAddComponent
   ],
   imports: [
      BrowserModule,
      NgbModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      CarService,
      UserService,
      BookingService,
      BrandService,
      LocationService,
      FueltypeService,
      AuthService,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
