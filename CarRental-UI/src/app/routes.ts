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


export const appRoutes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'login', component: LoginComponent},
 {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        { path: 'admin', component: AdminNavComponent},
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

        { path: 'car-fleet', component: CarFleetComponent}
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
