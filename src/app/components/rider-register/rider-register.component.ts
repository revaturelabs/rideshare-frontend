import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
@Component({
	selector: 'app-rider-register',
	templateUrl: './rider-register.component.html',
	styleUrls: ['./rider-register.component.css']
})
export class RiderRegisterComponent implements OnInit {


	userName: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	phone: string = '';
	batchNum: number;

	enable: boolean = true;
	failed: boolean = false;


  /**
   * @constructor 
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */

	constructor(private logService: LogService) { }

	/**
	 * When the component is initialized, batch service is invoked to retrieve all the batches.
	 */
	ngOnInit() {
		this.logService.info("hello")
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
		return /^([a-zA-z]){1,20}$/.test(name);
	}
	/**
	 * This function formats the name string.
	 */

	nameFormat(name: string) {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	}
	/**
	 * This function checks the email that the user entered.
	 */

	validateEmail() {
		return /^\w+@\w+\.\w{2,4}$/.test(this.email);
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
	
	}

	signUp() {
		this.logService.info(String(this.batchNum))
	}

}
