import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

/**
 * This is the Register Component
 */

export class RegisterComponent implements OnInit {

/**
 * An array of batches 
 */
	batches: Batch[] = [];
	user: User = new User();

  /**
   * This is a constructor
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */

	constructor(private userService: UserService, private batchService: BatchService, public validationService: ValidationService) { }


  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid; once validated a batch service is called.
   */
	ngOnInit() {
		this.batchService.getAllBatches()
			.subscribe(allBatches => {
				this.batches = allBatches;
				this.user.batch.batchNumber = this.batches[0].batchNumber;
		});
	}

	/**
	 * This function allows the user to select the batch location.
	 * @param event
	 */
	changeLocation(event) {
		let option = event.target.options.selectedIndex;
		this.user.batch.batchNumber = this.batches[option].batchNumber;
	}

	/**
	 * This function creates a driver if all the validations are true.
	 * @param role
	 */
	signUp(role) {
		if (this.validationService.validateUserName(this.user.userName) && this.validationService.validateName(this.user.firstName) && this.validationService.validateName(this.user.lastName) && this.validationService.validateEmail(this.user.email) && this.validationService.validatePhone(this.user.phoneNumber)) {
			this.user.firstName = this.validationService.nameFormat(this.user.firstName);
			this.user.lastName = this.validationService.nameFormat(this.user.lastName);
			this.user.phoneNumber = this.validationService.phoneFormat(this.user.phoneNumber);
			this.userService.createDriver(this.user, role);
		}
	}

}
