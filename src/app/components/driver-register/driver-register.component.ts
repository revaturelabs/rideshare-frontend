import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { CarService } from 'src/app/services/car-service/car.service';
import { User } from 'src/app/models/user';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';

@Component({
	selector: 'app-driver-register',
	templateUrl: './driver-register.component.html',
	styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

	batches: Batch[] = [];

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
	failed: boolean = false;

	constructor(private userService: UserService, private carService: CarService, private batchService: BatchService) { }

	ngOnInit() {
		this.batchService.getAllBatches()
			.subscribe(allBatches => {
				this.batches = allBatches;
		});
	}

	validateUserName() {
		return this.userName.length >= 3 && this.userName.length <= 8;
	}

	validateName(name: string) {
		return /^([a-zA-z]){1,20}$/.test(name);
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

	// signUp() {
	// 	if (this.validateUserName() && this.validateName(this.firstName) && this.validateName(this.lastName) && this.validateEmail() && this.validatePhone()) {
	// 		this.enable = false;
	// 		this.phone = this.phone.replace(/(\d{3})(\d{3})(\d{3})/, "($1) $2-$3");

	// 		if (this.userService.createDriver(this.userName, this.nameFormat(this.firstName), this.nameFormat(this.lastName), this.email, this.phone, this.batchNum)) {
	// 			console.log('success')
	// 			this.carService.createCar(this.color, this.seats, this.make, this.model, this.year, 10);
	// 		} else {
	// 			this.enable = true;
	// 			this.failed = true;
	// 			setTimeout(() => this.failed = false, 5000);
	// 		}

	// 	}
	// }

	signUp() {
		console.log(this.batchNum);
	}

}
