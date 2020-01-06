import { Batch } from './batch';

export class User {
    userId: number;
    userName: string;
    batch: Batch; 
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    active: boolean;
    driver: boolean;
    acceptingRides: boolean;
}