import { Batch } from './batch';

export class User {

    /**
     * User: user id
     */
    userId: number;

    /**
     * User: username
     */
    userName: string;

    /**
     * User: batch-> calls Batch constructor, Batch()
     */
    batch: Batch = new Batch();

    /**
     * User: first name
     */
    firstName: string;

    /**
     * User: last name
     */
    lastName: string;

    /**
     * User: email
     */
    email: string;

    /**
     * User: phone number as string
     */
    phoneNumber: string;

    /**
     * User: is the user active
     */
    active: boolean;

    /**
     * User: is the user a driver
     */
    isDriver: boolean;

    /**
     * User: is the user accepting rides
     */
    isAcceptingRides: boolean;

    /**
     * User: home state
     */
    hState: string;

    /**
     * User: home address
     */
    hAddress: string;

    /**
     * User: home city
     */
    hCity: string;

    /**
     * User: home zipcode
     */
    hZip: number;

    /**
     * User: work address
     */
    wAddress: string;

    /**
     * User: work city
     */
    wCity: string;

    /**
     * User: work state
     */
    wState: string;

    /**
     * User: work zipcode
     */
    wZip: number;
}