import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
	 loggedIn: boolean = false;

	constructor(private router: Router) { }

	public user: User;

	get isLoggedIn() {
		return this.loggedIn;
	}

	login(user: User, chosenUserName: string) {
		if (user.userName === chosenUserName) {
			this.loggedIn = true;
			this.user = user;
			sessionStorage.setItem('auth', String(this.user.userId));
			this.router.navigate(['/home']);
			this.fireIsLoggedIn.emit(this.user);
		} else {
			return false;
		}
	}

	getEmitter() {
		return this.fireIsLoggedIn;
	}
}
