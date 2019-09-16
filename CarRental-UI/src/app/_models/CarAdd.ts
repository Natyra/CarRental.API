import { Car } from './Car';

export interface CarAdd {
    carNumber: string;
    brandId: number;
    modelId: number;
    modelYear: string;
    fuelTypeId: number;
    transmisionTypeId: number;
    numberOfDoors: number;
    carCapacity: number;
    carColor: string;
    priceForDay: number;
    carLocationId: number;
    description: string;
    carList: Car;

}
