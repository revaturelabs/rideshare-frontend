import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';
import { Router } from '@angular/router';

@Component({
	selector: 'app-rider-register',
	templateUrl: './rider-register.component.html',
	styleUrls: ['./rider-register.component.css']
})
export class RiderRegisterComponent implements OnInit {

	batches: Batch[] = [];

	userName: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	phone: string = '';
	batchNum: number;

	enable: boolean = true;
	failed: boolean = false;

	constructor(private userService: UserService, private batchService: BatchService) { }

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
	
	changeLocation(event) {
		let option = event.target.options.selectedIndex;
		this.batchNum = this.batches[option].batchNumber;
	}

	signUp() {
		console.log(this.batchNum);
	}

}
