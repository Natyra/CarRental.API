import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CarsListComponent } from './admin/cars/cars-list/cars-list.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { BookingListComponent } from './admin/bookings/booking-list/booking-list.component';
import { LocationsListComponent } from './admin/locations/locations-list/locations-list.component';
import { BrandsListComponent } from './admin/brands/brands-list/brands-list.component';
import { CarFleetComponent } from './car-fleet/car-fleet.component';


export const appRoutes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'admin', component: AdminNavComponent},
 { path: 'cars', component: CarsListComponent},
 { path: 'users', component: UserListComponent},
 { path: 'bookings', component: BookingListComponent},
 { path: 'lotacions', component: LocationsListComponent},
 { path: 'brands', component: BrandsListComponent},
 { path: 'car-fleet', component: CarFleetComponent}
];
