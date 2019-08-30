import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
      CarFleetComponent
   ],
   imports: [
      BrowserModule,
      NgbModule,
      HttpClientModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      CarService,
      UserService,
      BookingService,
      BrandService,
      LocationService,
      FueltypeService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
