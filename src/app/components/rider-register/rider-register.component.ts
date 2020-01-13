import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';
import { User } from 'src/app/models/user';
import { ValidationService } from 'src/app/services/validation-service/validation.service';

@Component({
	selector: 'app-rider-register',
	templateUrl: './rider-register.component.html',
	styleUrls: ['./rider-register.component.css']
})
export class RiderRegisterComponent implements OnInit {

	batches: Batch[] = [];
	batch: Batch = new Batch();
	user: User = new User();

  /**
   * @constructor 
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */


  /**
   * @constructor 
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */

	constructor(private userService: UserService, private batchService: BatchService, private validationService: ValidationService) { }

	/**
	 * When the component is initialized, batch service is invoked to retrieve all the batches.
	 */
	ngOnInit() {
		this.user.batch = this.batch;
		this.batchService.getAllBatches()
			.subscribe(allBatches => {
				this.batches = allBatches;
				this.user.batch.batchNumber = this.batches[0].batchNumber;
		});
	}
	
	/**
	 * This function allows the user to select the batch location.
	 */
	changeLocation(event) {
		let option = event.target.options.selectedIndex;
		this.user.batch.batchNumber = this.batches[option].batchNumber;
	}

	signUp() {
		if (this.validationService.validateUserName(this.user.userName) && this.validationService.validateName(this.user.firstName) && this.validationService.validateName(this.user.lastName) && this.validationService.validateEmail(this.user.email) && this.validationService.validatePhone(this.user.phoneNumber)) {
			this.userService.createDriver(this.user, 'rider');
		}
	}

}