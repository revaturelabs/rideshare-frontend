import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.component.html',
  styleUrls: ['./car-register.component.css']
})

  /**
   * The Car Register component
   */

export class CarRegisterComponent implements OnInit {
 
  /**
   * Set years as an array of numbers
   * Set userId
   * Instantiates a car
   */

  years: number[] = [];
  userId: number;
  car: Car = new Car();
  
  /**
   * This is constructor
   * @param carService A dependency of a car service is injected.
   * @param router Provides an instance of a router.
   */

  constructor(private carService: CarService, private router: Router, public validationService: ValidationService, private authService: AuthService) { }

  /**
   * This is an OnInit function that sets the user id as the parsed string in session storage.
   * The system will check if the user id is valid.
   * Once validated, it will initialize the fields. 
   */
  ngOnInit() {
    this.userId = this.authService.user.userId;

    if (!this.userId) {
      this.router.navigate(['']);
    } else {
      let currentYear = new Date().getFullYear();
      let availableYear = currentYear - 15;
      for (let i = availableYear; i <= currentYear; i++) {
        this.years.push(i);
        this.car.year = this.years[0];
      }
    }
  }

 /**
  * @param event
  * @returns {void}
  */
  changeYear(event) {
		let option = event.target.options.selectedIndex;
		this.car.year = this.years[option];
  }
  
  /**
   * A POST method that adds a car object to the user
   */
  addCar() {
    if (this.validationService.validateSeats(this.car.seats)) {
      this.carService.createCar(this.car, this.userId);
    }
  }

}
