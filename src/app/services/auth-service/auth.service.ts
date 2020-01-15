import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';


@Injectable({
  	providedIn: 'root'
})
export class AuthService {
	/**
	 * This is the Authorization Service
	 */


	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * This is the constructor
	 * @param router Creates a router instance
	 */
	constructor(private router: Router) { }

	/**
	 * An user object is created
	 */
	public user: any = {};

	/**
	 * This function logs the user into the application
	 * @param user 
	 * @param chosenUserName 
	 */

	login(user: User, chosenUserName: string) {
		if (user.userName === chosenUserName) {
			this.user = user;
			if(this.user.driver){
				this.router.navigate(['/driver']);
			}
			else{
				this.router.navigate(['/home']);
			}
			
			this.fireIsLoggedIn.emit(this.user);
		} else {
			return false;
		}
	}

	/**
	 * This function returns an emitter.
	 */

	getEmitter() {
		return this.fireIsLoggedIn;
	}
}
