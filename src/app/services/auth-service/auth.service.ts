import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
	private loggedIn: boolean = false;

	constructor(private router: Router) { }

	public user: User;
	public admin: Admin;

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

	LoginAsAdmin(admin: Admin, userName: string) {
		if (admin.userName === userName) {
			this.loggedIn = true;
			this.admin = admin;
			sessionStorage.setItem('auth', 'admin')
			sessionStorage.setItem('admin', String(this.admin.adminId));
			this.router.navigate(['/home']);
			this.fireIsLoggedIn.emit(this.admin);
		} else {
			return false;
		}
	}

	getEmitter() {
		return this.fireIsLoggedIn;
	}
}
