import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    url: string = 'http://localhost:8080/cars/';
	car: Car = new Car();
	user: User = new User();

	constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

	getAllCars() {
		return this.http.get<Car[]>(this.url);
	}

	getCarByUserId(userId: number) {
		return this.http.get<Car>(`${this.url}users/${userId}`).toPromise();
	}
	
	createCar(color, seats, make, model, year, userId) {

		this.user.userId = userId;

		this.car.color = color;
		this.car.seats = seats;
		this.car.make = make;
		this.car.model = model;
		this.car.year = year;
		this.car.user = this.user;

		this.http.post(this.url, this.car, {observe: 'response'}).subscribe(
			(response) => {
				if (response) {
					this.userService.updateIsDriver(true, userId);
					this.router.navigate(['car']);
				}
			},
			(error) => {
				console.warn(error);
				alert("Server Error! Please Try Again Later.");
			}
		);
	}

	removeCar(carId: number) {
		return this.http.delete<Car>(this.url+carId);
	}
}
