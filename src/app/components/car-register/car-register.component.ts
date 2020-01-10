import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';

@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.component.html',
  styleUrls: ['./car-register.component.css']
})

  /**
   * The Car Register component
   */

export class CarRegisterComponent implements OnInit {

  years: number[] = [];
  userId: number;

  color: string = '';
	seats: number;
	make: string = '';
	model: string = '';
  year: number;
  
  /**
   * @constructor
   * @param carService A dependency of a car service is injected.
   * @param router Provides an instance of a router.
   */

  constructor(private carService: CarService, private router: Router) { }

  /**
   * This is an OnInit function that sets the user id as the parsed string in session storage.
   * The system will check if the user id is valid.
   * Once validated, it will initialize the fields. 
   */
  ngOnInit() {
    this.userId = Number(sessionStorage.getItem('auth'));
    if (!this.userId) {
      this.router.navigate(['']);
    } else {
      let currentYear = new Date().getFullYear();
      let availableYear = currentYear - 15;
      for (let i = availableYear; i <= currentYear; i++) {
        this.years.push(i);
        this.year = this.years[0];
      }
    }
  }

 /**
  * @function
  * @param event
  * @returns {void}
  */
  changeYear(event) {
		let option = event.target.options.selectedIndex;
		this.year = this.years[option];
  }

 /** 
  * this function validates the number of seats of the car.
  * @function
  * @returns {boolean}
  */

  validateSeats() {
    return this.seats > 0 && this.seats <= 6 && this.seats % 1 === 0;
  }

 /** 
  * this function will create a car if validateSeats returns true.
  * @function
  * @returns {void}
  */
  
  addCar() {
    if (this.validateSeats()) {
      this.carService.createCar(this.color, this.seats, this.make, this.model, this.year, this.userId);
    }
  }

}
