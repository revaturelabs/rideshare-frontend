import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    url: string = 'http://localhost:8080/cars';
	car: Car = new Car();
	user: User = new User();

	constructor(private http: HttpClient) { }

	getAllCars() {
		return this.http.get<Car[]>(this.url);
	}
	
	createCar(color, seats, make, model, year, userId) {

		this.user.userId = userId;

		this.car.color = color;
		this.car.seats = seats;
		this.car.make = make;
		this.car.model = model;
		this.car.year = year;
		this.car.user = this.user;

		return this.http.post(this.url, this.car, {observe: 'response'}).subscribe(
			(response) => {
				console.log(response.body);
				return true;
			},
			(error) => {
				console.warn(error);
				return false;
			}
		);
	}
}
