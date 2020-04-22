import { Component, OnInit, NgModule } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import {  Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Batch } from 'src/app/models/batch';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/user';
import { ValidationService } from '../../validation.service';


@Component({
	selector: 'app-user-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

@NgModule({
    imports: [
       RouterModule
	 ]
	})
/**
 * This is the Driver Register
 */

export class RegisterComponent implements OnInit {

	signupform: FormGroup;
	batches: Batch[] = [];
	user: User = new User();

  /**
   * @constructor 
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */

	constructor(private userService: UserService, 
		private batchService: BatchService, 
		private router: Router,
		private formBuilder: FormBuilder) { 

			this.signupform = this.formBuilder.group ({
				'userName':  ['', [Validators.required, 
					Validators.minLength(2), 
					Validators.maxLength(35),
					ValidationService.stringValidator]],
				'firstname':  ['', [Validators.required, 
					Validators.minLength(2), 
					Validators.maxLength(35),
					ValidationService.stringValidator]],
				 'lastname':['', [Validators.required, 
				 Validators.minLength(2), 
				 Validators.maxLength(35),
				 ValidationService.stringValidator]], 
				 'email':['', [Validators.required, 
					ValidationService.emailValidator]],
				 'phonenumber':['', [Validators.required, 
				 Validators.minLength(10),
				 ValidationService.phoneNumberValidator]]
			   })
		}
	


  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid; once validated a batch service is called.
   */
	ngOnInit() {
		
		/*if (sessionStorage.getItem('auth')) {
			this.router.navigate(['home']);
		} */
	}
	
	  

	/**
	 * This function allows the user to select the batch location.
	 */
	/*changeLocation(event) {
		let option = event.target.options.selectedIndex;
		this.user.batch.batchNumber = this.batches[option].batchNumber;
	}*/

	/**
	 * This function creates a driver if all the validations are true.
	 */
/*	signUpDriver() {
		//if (this.validationService.validateUserName(this.user.userName) && this.validationService.validateName(this.user.firstName) && this.validationService.validateName(this.user.lastName) && this.validationService.validateEmail(this.user.email) && this.validationService.validatePhone(this.user.phoneNumber)) {
			this.userService.createDriver(this.user, 'driver');
		//}
	}
	signUpRider() {
		if (this.validationService.validateUserName(this.user.userName) && this.validationService.validateName(this.user.firstName) && this.validationService.validateName(this.user.lastName) && this.validationService.validateEmail(this.user.email) && this.validationService.validatePhone(this.user.phoneNumber)) {
			this.userService.createDriver(this.user, 'rider');
		}
	}*/

	}