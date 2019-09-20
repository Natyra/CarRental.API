export interface PreBooking {
    pickUpLocationId: number;
    returnLocationId: number;
    pickUpDate: string;
    returnDate: string;
    pickUpDateReal?: Date;
    returnDateReal?: Date;
    driverAge: number;
    carId: number;
}