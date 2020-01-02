import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { CarService } from 'src/app/services/car-service/car.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';

@Component({
	selector: 'app-driver-register',
	templateUrl: './driver-register.component.html',
	styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

	batches: Batch[] = [];
	years: number[] = [];

	userName: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	phone: string = '';
	batchNum: number;
	color: string = '';
	seats: number;
	make: string = '';
	model: string = '';
	year: number;

	enable: boolean = true;
	userFailed: boolean = false;

	constructor(private userService: UserService, private carService: CarService, private batchService: BatchService) { }

	ngOnInit() {
		let currentYear = new Date().getFullYear();
		let availableYear = currentYear - 15;
		for (let i = availableYear; i <= currentYear; i++) {
			this.years.push(i);
			this.year = this.years[0];
		}

		this.batchService.getAllBatches()
			.subscribe(allBatches => {
				this.batches = allBatches;
				this.batchNum = this.batches[0].batchNumber;
		});
	}

	validateUserName() {
		return this.userName.length >= 3 && this.userName.length <= 8;
	}

	validateName(name: string) {
		return /^([a-zA-z]){1,20}$/.test(name) && name.length < 20;
	}

	nameFormat(name: string) {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	}

	validateEmail() {
		return /^\w+@\w+\.\w{2,4}$/.test(this.email);
	}

	validatePhone() {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(this.phone);
	}

	changeAddress(event) {
		let option = event.target.options.selectedIndex;
		this.batchNum = this.batches[option].batchNumber;
	}

	changeYear(event) {
		let option = event.target.options.selectedIndex;
		this.year = this.years[option];
	}

	signUp() {
		if (this.validateUserName() && this.validateName(this.firstName) && this.validateName(this.lastName) && this.validateEmail() && this.validatePhone()) {
			this.enable = false;
			this.phone = this.phone.replace(/(\d{3})(\d{3})(\d{3})/, "($1) $2-$3");

			if (this.userService.createDriver(this.userName, this.nameFormat(this.firstName), this.nameFormat(this.lastName), this.email, this.phone, this.batchNum)) {
				console.log('success')

				// hard coded userId for car
				this.carService.createCar(this.color.toUpperCase(), this.seats, this.make, this.model, this.year, 24);
			} else {
				this.enable = true;
				this.userFailed = true;
				setTimeout(() => this.userFailed = false, 5000);
			}

		}
	}

}
