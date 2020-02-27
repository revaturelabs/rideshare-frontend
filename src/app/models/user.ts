import { Batch } from './batch';

export class User {
    /**
     * Set User model
     */
    userId: number;
    /**
     * Set username as a string
     */
    userName: string;
    /**
     * Attached a batch object
     */
    batch: Batch = new Batch();
    /**
     * Set first name as a string
     */
    firstName: string;
    /**
     * Set last name as a string
     */
    lastName: string;
    /**
     * Set email as a string
     */
    email: string;
    /**
     * Set phone number as a string
     */
    phoneNumber: string;
    /**
     * Set active as a boolean
     */
    active: boolean;
    /**
     * Set driver as a boolean
     */
    isDriver: boolean;
    /**
     * Set accepting ride as a boolean
     */
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