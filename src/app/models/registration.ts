import { Batch } from './batch';

export class Registration {

    batch: Batch;
    isdriver: boolean;
    
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    
    address: string;
    city: string;
    state: string;
    zipcode: string;

    username: string;
    password: string;


/*
    constructor(a:Batch, b:boolean, c:string, d:string, e:string, f:string, g:string, h:string, i:string, j:string, k:string, l:string) {
        //Inject the batch... sigh*
        this.batch = a;
        this.isdriver = b;
        
        this.firstname = c;
        this.lastname = d;
        this.email = e;
        this.phonenumber = f;
        
        this.address = g;
        this.city = h;
        this.state = i;
        this.zipcode = j;

        this.username = k;
        this.password = l;
    }
*/
}