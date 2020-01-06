import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { Router } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class UserService {

	url: string = 'http://localhost:8080/users/';
	user: User = new User();
	batch: Batch = new Batch();

	constructor(private http: HttpClient, private router: Router) { }

	getAllUsers() {
		return this.http.get<User[]>(this.url);
	}

	getUserById(idParam: number){
		return this.http.get<User>(this.url+idParam).toPromise();
	}

	createDriver(userName, firstName, lastName, email, phone, batchNum) {

		this.batch.batchNumber = batchNum;

		this.user.userName = userName;
		this.user.firstName = firstName;
		this.user.lastName = lastName;
		this.user.email = email;
		this.user.phoneNumber = phone;
		this.user.batch = this.batch;
		this.user.driver = false;
		this.user.active = true;
		this.user.acceptingRides = false;

		this.http.post(this.url, this.user, {observe: 'response'}).subscribe(
			(response) => {
				let userId = response.body[Object.keys(response.body)[0]];
				sessionStorage.setItem('auth', userId);
				this.router.navigate(['new/car']);
			},
			(error) => {
				console.warn(error);
				alert("Server Error! Please Try Again Later.");
			}
		);

	}

	updateIsDriver(isDriver, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user.driver = isDriver;
				this.user.acceptingRides = isDriver === true;

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
}
