import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';



//THIS SERVICE AUTHORIZES A USER. NOTE THAT EACH PAGE IN THIS APPPLICATION HAS BEEN 
//CODED WITH SOME KIND OF CRAP IN ONIT() THAT USES THIS SERVICE. TO REFACTOR ALL OF 
//THIS WOULD BE A TEDIOUS TASK. THEY SHOULD'VE JUST USED SESSION STORAGE...



@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
	 loggedIn: boolean = false;

	constructor(private router: Router) { }

	public user: any = {};
	public admin: Admin = new Admin();

	/**
	 * This function logs the user into the application
	 * @param user 
	 * @param chosenUserName 
	 */
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

	/**
	 * This function returns an emitter.
	 */
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