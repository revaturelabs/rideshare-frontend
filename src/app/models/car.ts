import { User } from './user';

export class Car {

    carId: number;

    make: string;

    model: string;

    color: string;

    seats: number;

    year: number;

    user: User = new User();
}
