import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    url: string = 'http://localhost:8080/cars';
    car: Car = new Car();

	constructor(private http: HttpClient) { }
	
	createCar(color, seats, make, model, year, userId) {
		this.car.color = color;
		this.car.seats = seats;
		this.car.make = make;
		this.car.model = model;
		this.car.year = year;
		this.car.user.userId = userId;

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
