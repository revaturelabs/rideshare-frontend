import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';

@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.component.html',
  styleUrls: ['./car-register.component.css']
})
export class CarRegisterComponent implements OnInit {

  years: number[] = [];
  userId: number;

  color: string = '';
	seats: number;
	make: string = '';
	model: string = '';
	year: number;

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit() {
    this.userId = Number(sessionStorage.getItem('auth'));
    if (!this.userId) {
      this.router.navigate(['home']);
    } else {
      let currentYear = new Date().getFullYear();
      let availableYear = currentYear - 15;
      for (let i = availableYear; i <= currentYear; i++) {
        this.years.push(i);
        this.year = this.years[0];
      }
    }
  }

  changeYear(event) {
		let option = event.target.options.selectedIndex;
		this.year = this.years[option];
  }

  validateSeats() {
    return this.seats > 0 && this.seats <= 6 && this.seats % 1 === 0;
  }
  
  addCar() {
    if (this.validateSeats()) {
      this.carService.createCar(this.color, this.seats, this.make, this.model, this.year, this.userId);
    }
  }

}
