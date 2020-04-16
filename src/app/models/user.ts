import { Batch } from './batch';
import { Car } from './car';

export class User {
    
    batch: Batch;

    //NOTE: NO PASSWORD FIELD. W T F
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    driver: boolean;
    hState: string;
    hAddress: string;
    hCity: string;
    hZip: number;
    
    userId: number;//will be null for register.
    active: boolean;//will be null for register.
    isAcceptingRides: boolean;//will be null for register.
    wAddress: string;//will be null for register.
    wCity: string;//will be null for register.
    wState: string;//will be null for register.
    wZip: number;//will be null for register.
    car: Car;
//Do not add a parameterized constructor here unless you enjoy wasting your time 
//and being disappointed by this piece of shit application..

}