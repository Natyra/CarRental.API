import { Car } from './Car';
import { User } from './User';

export interface Booking {
    id: number;
    car: Car;
    pickUpLocation: string;
    returnLocation: string;
    pickUpDate: Date;
    returnDate: Date;
    user: User;
}
