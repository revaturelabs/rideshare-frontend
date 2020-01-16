import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';


@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	constructor(public router: Router) { }

	public user: any = {};

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

	getEmitter() {
		return this.fireIsLoggedIn;
	}
}
