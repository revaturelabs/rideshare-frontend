import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';

@Injectable({
  	providedIn: 'root'
})
export class UserService {

	url: string = 'http://localhost:8080/users';
	user: User = new User();
	batch: Batch = new Batch();

	constructor(private http: HttpClient) { }

	createDriver(userName, firstName, lastName, email, phone, batchNum) {
		this.batch.batchNumber = batchNum;

		this.user.userName = userName;
		this.user.firstName = firstName;
		this.user.lastName = lastName;
		this.user.email = email;
		this.user.phoneNumber = phone;
		this.user.batch = this.batch;
		this.user.isDriver = true;
		this.user.isActive = true;
		this.user.isAcceptingRides = true;

		return this.http.post(this.url, this.user, {observe: 'response'}).subscribe(
			(response) => {
				console.log(response);
				return true;
			},
			(error) => {
				console.warn(error);
				return false;
			}
		);
	}
}
