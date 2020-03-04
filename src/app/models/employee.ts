import { Office } from 'src/app/models/office';

export class Employee {
    employee_id : number;
    email : string;
    first_name : string;
    last_name : string;
    phone_number : string;
    username : string;
    password : string;
    user_address : string;
    is_accepting_rides : boolean;
    is_active : boolean;
    isDriver : boolean;
    is_manager : boolean;
    office : Office;

    constructor(employee_id : number, email : string, first_name : string, last_name : string,
                phone_number : string, username : string, password : string, user_address : string,
                is_accepting_rides : boolean, is_active : boolean, isDriver : boolean,
                is_manager : boolean, office : Office) {
        this.employee_id = employee_id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.username = username;
        this.password = password;
        this.user_address = user_address;
        this.is_accepting_rides = is_accepting_rides;
        this.is_active = is_active;
        this.isDriver = isDriver;
        this.is_manager = is_manager;
        this.office = office;
    }
}