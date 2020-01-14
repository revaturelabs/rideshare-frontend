import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	url: string = environment.userUri;
	user: User = new User();

	constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
	
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
				this.authService.user = response.body;
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

	getDriverById(id: number): Observable <any>{
		return this.http.get(this.url + id);
	  
	  }

	changeDriverIsAccepting(data) {
		console.log("put method", data);
		let id=data.userId;
		return this.http.put(this.url+id, data)
		
	  }
	  
	  getRidersForLocation(location: string): Observable <any>{
		console.log("getRidersForLocation url ", this.url + '?is-driver=false&location='+ location);
		return this.http.get(this.url + '?is-driver=false&location='+ location)
	  }
	  
		showAllUser(): Observable<any>{
		  return this.http.get(this.url);
		}
}
