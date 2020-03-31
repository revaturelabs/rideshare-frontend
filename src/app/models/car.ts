import { User } from './user';

export class Car {

    /**
     * Car: car id
     */
    carId: number;

    /**
     * Car: car color  
     */
    color: string;

    /**
     * Car: number of seats
     */
    seats: number;

    /**
     * Car: car make
     */
    make: string;

    /**
     * Car: car model
     */
    model: string;

    /**
     * Car: year of the car
     */
    year: number;

    /**
     * Car: user-> calls User constructor, User()
     */
    user: User = new User();
}