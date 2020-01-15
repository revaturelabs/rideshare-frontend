import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';


@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	constructor(private router: Router) { }

	public user: any = {};
	public admin: Admin = new Admin();

	login(user: User, chosenUserName: string) {
		if (user.userName === chosenUserName) {
			this.user = user;
			if(this.user.driver){
				this.router.navigate(['/home/riders']);
			}
			else{
				this.router.navigate(['/home/drivers']);
			}
			
			this.fireIsLoggedIn.emit(this.user);
		} else {
			return false;
		}
	}

	loginAsAdmin(admin: Admin, userName: string) {
		if (admin.userName === userName) {
			this.admin = admin;
			this.router.navigate(['/admin']);
			this.fireIsLoggedIn.emit(this.admin);
		} else {
			return false;
		}
	}

	getEmitter() {
		return this.fireIsLoggedIn;
	}
}
