import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';



/**
 * This is a car service
 */



@Injectable({
    providedIn: 'root'
})

export class CarService {

    url: string = environment.carUri;
	user: User = new User();

	constructor(private http: HttpClient, private router: Router, private userService: UserService) { }



	/**
	 * This function fetches all cars from the database.
	 */
	getAllCars() {
		return this.http.get<Car[]>(this.url);
	}

	/**
	 * This function returns an car by user ID.
	 * @param userId 
	 */
	getCarByUserId(userId: number) {
		return this.http.get<Car>(`${this.url}users/${userId}`).toPromise();
	}

	getCarByUserId2(userId: string): Observable<Car> {
		return this.http.get<Car>(`${this.url}users/${userId}`);
	}

	//concat car.carId with this.url to update a specific car.
	updateCarInfo1(car: Car) {
		return this.http.put(this.url+car.carId, car).toPromise();
	}
	updateCarInfo(id: Number, car: Car) {
		//console.log(user);
		return this.http.put(`${this.url}/${id}`, car).toPromise();
	}

	/**
	 * This function creates a car.
	 * @param car 
	 * @param userId 
	 */
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
			}
		);
	}

	/**
	 * This function removes a Car.
	 * @param carId 
	 */
	removeCar(carId: number) {
		return this.http.delete<Car>(this.url+carId);
	}
}