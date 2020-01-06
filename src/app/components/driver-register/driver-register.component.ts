import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';
import { Router } from '@angular/router';

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

	constructor(private userService: UserService, private batchService: BatchService, private router: Router) { }

	ngOnInit() {
		if (sessionStorage.getItem('auth')) {
			this.router.navigate(['home']);
		} else {
			this.batchService.getAllBatches()
				.subscribe(allBatches => {
					this.batches = allBatches;
					this.batchNum = this.batches[0].batchNumber;
			});
		}
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

	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{3})/, "($1) $2-$3");
	}

	validateEmail() {
		return /^[\.|\w]+@\w+\.\w{2,4}$/.test(this.email);
	}

	validatePhone() {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(this.phone);
	}

	changeAddress(event) {
		let option = event.target.options.selectedIndex;
		this.batchNum = this.batches[option].batchNumber;
	}

	signUp() {
		if (this.validateUserName() && this.validateName(this.firstName) && this.validateName(this.lastName) && this.validateEmail() && this.validatePhone()) {
			this.userService.createDriver(this.userName, this.nameFormat(this.firstName), this.nameFormat(this.lastName), this.email, this.phoneFormat(this.phone), this.batchNum)
		}
	}

}
