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

/**
 * This is the Driver Register
 */

export class DriverRegisterComponent implements OnInit {

	batches: Batch[] = [];

	userName: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	phone: string = '';
	batchNum: number;

  /**
   * @constructor 
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */

	constructor(private userService: UserService, private batchService: BatchService, private router: Router) { }


  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid; once validated a batch service is called.
   */
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

	/**
	 * This function is validates the length of the username
	 */
	validateUserName() {
		return this.userName.length >= 3 && this.userName.length <= 8;
	}
	/**
	 * This function is validates the length of the name and checks if there is any numeric values in the name string.
	 */
	validateName(name: string) {
		return /^([a-zA-z]){1,20}$/.test(name) && name.length < 20;
	}
	/**
	 * This function formats the name string.
	 */
	nameFormat(name: string) {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	}
	/**
	 * This function formats the phone number.
	 */
	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}
	/**
	 * This function checks the email that the user entered.
	 */
	validateEmail() {
		return /^\w+\.?\w+@\w+\.\w{2,4}$/.test(this.email);
	}
	/**
	 * This function validates the phone number.
	 */
	validatePhone() {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(this.phone);
	}

	/**
	 * This function allows the user to select the batch location.
	 */
	changeLocation(event) {
		let option = event.target.options.selectedIndex;
		this.batchNum = this.batches[option].batchNumber;
	}

	/**
	 * This function creates a driver if all the validations are true.
	 */

	signUp() {
		if (this.validateUserName() && this.validateName(this.firstName) && this.validateName(this.lastName) && this.validateEmail() && this.validatePhone()) {
			this.userService.createDriver(this.userName, this.nameFormat(this.firstName), this.nameFormat(this.lastName), this.email, this.phoneFormat(this.phone), this.batchNum)
		}
	}

}
