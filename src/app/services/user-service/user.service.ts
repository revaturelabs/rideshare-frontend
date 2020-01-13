import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	url: string = environment.userUri;
	user: User = new User();

	constructor(private http: HttpClient, private router: Router) { }
	
	getAllUsers() {
		return this.http.get<User[]>(this.url);
	}

	getUserById(idParam: number){
		return this.http.get<User>(this.url+idParam).toPromise();
	}

	createDriver(user: User, role) {

		user.active = true;
		user.driver = false;
		user.acceptingRides = false;

		this.http.post(this.url, user, {observe: 'response'}).subscribe(
			(response) => {
				let userId = response.body[Object.keys(response.body)[0]];
				sessionStorage.setItem('auth', userId);
				this.fireIsLoggedIn.emit(response.body);
				if (role === 'driver') {
					this.router.navigate(['new/car']);
				} else {
					this.router.navigate(['home']);
				}
			},
			(error) => {
				console.warn(error);
				alert("Server Error! Please Try Again Later.");
			}
		);

	}

	getEmitter() {
		return this.fireIsLoggedIn;
	}

	updateIsDriver(isDriver, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user.driver = isDriver;
				this.user.acceptingRides = (this.user.active && isDriver);

				this.http.put(this.url+userId, this.user).subscribe(
					(response) => {
					  console.log(response);
					},
					(error) => console.warn(error)
				);
			})
			.catch(e => {
				console.warn(e);
			})
	}

	updatePreference(property, bool, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user[property] = bool;
				if (property === 'active' && bool === false) {
					this.user.acceptingRides = false;
				}

				this.http.put(this.url+userId, this.user).subscribe(
					(response) => {
					  console.log(response);
					},
					(error) => console.warn(error)
				);
			})
			.catch(e => {
				console.warn(e);
			})
	}

	updateUserInfo(user: User) {
		return this.http.put(this.url+user.userId, user).toPromise();
	}
}
