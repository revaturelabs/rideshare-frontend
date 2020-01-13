import { Batch } from './batch.model';

export class User {
    userId: number;
    userName: string;
    batch: Batch; 
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    driver: boolean;
    active: boolean;
    acceptingRides: boolean;
}