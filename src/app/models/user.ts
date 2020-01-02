import { Batch } from './batch';

export class User {
    userId: number;
    userName: string;
    batch: Batch; 
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isDriver: boolean;
    isActive: boolean;
    isAcceptingRides: boolean;
}