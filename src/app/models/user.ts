import { Batch } from './batch';

export class User {
    
    batch: Batch = new Batch();

    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    active: boolean;
    isDriver: boolean;
    isAcceptingRides: boolean;
    hState: string;
    hAddress: string;
    hCity: string;
    hZip: number;
    wAddress: string;
    wCity: string;
    wState: string;
    wZip: number;

}