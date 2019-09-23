import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CarsListComponent } from './admin/cars/cars-list/cars-list.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { BookingListComponent } from './admin/bookings/booking-list/booking-list.component';
import { LocationsListComponent } from './admin/locations/locations-list/locations-list.component';
import { BrandsListComponent } from './admin/brands/brands-list/brands-list.component';
import { CarFleetComponent } from './car-fleet/car-fleet.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { CarAddComponent } from './admin/cars/car-add/car-add.component';
import { FueltypesListComponent } from './admin/fueltypes/fueltypes-list/fueltypes-list.component';
import { LocationAddComponent } from './admin/locations/location-add/location-add.component';
import { BrandAddComponent } from './admin/brands/brand-add/brand-add.component';
import { FueltypesAddComponent } from './admin/fueltypes/fueltypes-add/fueltypes-add.component';
import { ModelListComponent } from './admin/carmodels/model-list/model-list.component';
import { ModelAddComponent } from './admin/carmodels/model-add/model-add.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { BookingGuard } from './_guards/booking.guard';
import { CarResultComponent } from './car-result/car-result.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { CarsResultGuard } from './_guards/carsresult.guard';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { ContactComponent } from './contact/contact.component';


export const appRoutes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'login', component: LoginComponent},
 { path: 'car-fleet', component: CarFleetComponent},
 { path: 'customer-login', component: CustomerLoginComponent},
 { path: 'my-booking/:id', canActivate: [BookingGuard], component: MyBookingComponent},
 {path: 'car-result', component: CarResultComponent},
 {path: 'booking-summary', component: BookingSummaryComponent},
 {path: 'confirm-booking', component: ConfirmBookingComponent},
 {path: 'contact', component: ContactComponent},

 {
    path: 'admin',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: AdminNavComponent,
    children: [
        //{ path: 'admin', component: AdminNavComponent},
        { path: 'cars', component: CarsListComponent},
        {path: 'cars/add', component: CarAddComponent},
        {path: 'cars/add/:id', component: CarAddComponent},
        { path: 'users', component: UserListComponent },
        { path: 'bookings', component: BookingListComponent},
        { path: 'locations', component: LocationsListComponent},
        { path: 'locations/add', component: LocationAddComponent},
        { path: 'locations/add/:id', component: LocationAddComponent},
        { path: 'brands', component: BrandsListComponent},
        { path: 'brands/add', component: BrandAddComponent},
        { path: 'brands/add/:id', component: BrandAddComponent},
        { path: 'fuel', component: FueltypesListComponent},
        { path: 'fuel/add', component: FueltypesAddComponent},
        { path: 'fuel/add/:id', component: FueltypesAddComponent},
        { path: 'models', component: ModelListComponent},
        { path: 'models/add', component: ModelAddComponent},
        { path: 'models/add', component: ModelAddComponent},
    ]
 },
 { path: '**', redirectTo: '', pathMatch: 'full'},

//  { path: 'admin', component: AdminNavComponent},
//  { path: 'cars', component: CarsListComponent},
//  { path: 'users', component: UserListComponent},
//  { path: 'bookings', component: BookingListComponent},
//  { path: 'lotacions', component: LocationsListComponent},
//  { path: 'brands', component: BrandsListComponent},
//  { path: 'car-fleet', component: CarFleetComponent}
];
