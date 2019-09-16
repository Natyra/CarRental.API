import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { appRoutes } from './routes';
import {NgbModule, NgbDropdown, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
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
import { LocationAddComponent } from './admin/locations/location-add/location-add.component';
import { BrandAddComponent } from './admin/brands/brand-add/brand-add.component';
import { ModalModule } from 'ngx-bootstrap';
import { FueltypesAddComponent } from './admin/fueltypes/fueltypes-add/fueltypes-add.component';
import { ModelListComponent } from './admin/carmodels/model-list/model-list.component';
import { ModelAddComponent } from './admin/carmodels/model-add/model-add.component';
import { CarmodelService } from './_services/carmodel.service';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { AuthGuard } from './_guards/auth.guard';
import { BookingGuard } from './_guards/booking.guard';
import { DatePipe } from '@angular/common';
import { CarResultComponent } from './car-result/car-result.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ChangeSearchComponent } from './change-search/change-search.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { CarsResultGuard } from './_guards/carsresult.guard';
import { GeneralService } from './_services/general.service';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';

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
      CarAddComponent,
      LocationAddComponent,
      BrandAddComponent,
      FueltypesAddComponent,
      ModelListComponent,
      ModelAddComponent,
      CustomerLoginComponent,
      MyBookingComponent,
      CarResultComponent,
      ChangeSearchComponent,
      BookingSummaryComponent,
      ConfirmBookingComponent
   ],
   imports: [
      BrowserModule,
      AngularDateTimePickerModule,
      NgbModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgbPaginationModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      ModalModule.forRoot()
   ],
   providers: [
      CarService,
      UserService,
      BookingService,
      BrandService,
      LocationService,
      FueltypeService,
      AuthService,
      AlertifyService,
      CarmodelService,
      AuthGuard,
      BookingGuard,
      DatePipe,
      BookingGuard,
      CarsResultGuard,
      GeneralService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }