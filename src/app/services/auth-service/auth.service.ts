import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	private loggedIn: boolean = false;

	constructor(private router: Router) { }

	public user: User;

	get isLoggedIn() {
		return this.loggedIn;
	}

	login(user: User, chosenUserName: string) {
		if (user.userName === chosenUserName) {
			this.loggedIn = true;
			this.user = user;
			this.router.navigate(['/home']);
		} else {
			alert('Wrong')
		}
	}
}
