import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    url: string = environment.carUri;
	user: User = new User();

	constructor(private http: HttpClient, public router: Router, private userService: UserService) { }

	getAllCars() {
		return this.http.get<Car[]>(this.url);
	}

	getCarByUserId(userId: number) {
		return this.http.get<Car>(`${this.url}users/${userId}`).toPromise();
	}
	
	createCar(car, userId) {

		this.user.userId = userId;
		car.user = this.user;

		this.http.post(this.url, car, {observe: 'response'}).subscribe(
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
