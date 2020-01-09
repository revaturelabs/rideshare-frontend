import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  newUser: User = new User();
  batch: Batch = new Batch();
  batches: Batch[] = [];
  oldBatchNumber: number;
  oldBatchLocation: string;

  editable: string = '';
  noChange: boolean = false;
  updateSuccess: boolean = false;
  updateFailed: boolean = false;

  constructor(private router: Router, private userService: UserService, private batchService: BatchService) { }

  ngOnInit() {
    this.user.userId = Number(sessionStorage.getItem('auth'));
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.user.batch = this.batch;
      this.userService.getUserById(this.user.userId).then(response => {
        if (response) {
          this.user = response;
          this.oldBatchNumber = this.user.batch.batchNumber;
          this.oldBatchLocation = this.user.batch.batchLocation;
          this.newUser = Object.assign({}, this.user);

          this.batchService.getAllBatches()
            .subscribe(allBatches => {
              this.batches = allBatches;
              let idx = this.batches.findIndex(batch => batch.batchNumber === this.user.batch.batchNumber);
              this.batches = this.batches.splice(idx, 1).concat(this.batches);
          });
        } else {
          sessionStorage.clear();
          this.router.navigate(['']);
        }
      })
  }

  compareUser() {
    return this.user.firstName.toLowerCase() === this.newUser.firstName.toLowerCase() && this.user.lastName.toLowerCase() === this.newUser.lastName.toLowerCase() && this.user.userName === this.newUser.userName && this.user.email === this.newUser.email && this.phoneFormat(this.user.phoneNumber) === this.phoneFormat(this.newUser.phoneNumber) && this.user.batch.batchNumber === this.oldBatchNumber;
  }

  validateUserName() {
		return this.newUser.userName.length >= 3 && this.newUser.userName.length <= 8;
	}

	validateName(name: string) {
		return /^([a-zA-z]){1,20}$/.test(name) && name.length < 20;
	}

	nameFormat(name: string) {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	}

	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}

	validateEmail() {
		return /^\w+\.?\w+@\w+\.\w{2,4}$/.test(this.newUser.email);
	}

	validatePhone() {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(this.newUser.phoneNumber);
  }
  
  changeLocation(event) {
		let option = event.target.options.selectedIndex;
    this.newUser.batch.batchNumber = this.batches[option].batchNumber;
    this.newUser.batch.batchLocation = this.batches[option].batchLocation;
	}

  updateProfile() {
    if (this.validateUserName() && this.validateName(this.newUser.firstName) && this.validateName(this.newUser.lastName) && this.validateEmail() && this.validatePhone()) {
      this.editable = '';
      if (this.compareUser()) {
        this.noChange = true;
        this.newUser = Object.assign({}, this.user);
        setTimeout(() => this.noChange = false, 3000);
      } else {
        this.newUser.firstName = this.nameFormat(this.newUser.firstName);
        this.newUser.lastName = this.nameFormat(this.newUser.lastName);
        this.newUser.phoneNumber = this.phoneFormat(this.newUser.phoneNumber);

        this.userService.updateUserInfo(this.newUser).then(response => {
          console.log(response);
          this.getUserInfo();
          this.updateSuccess = true;
          setTimeout(() => this.updateSuccess = false, 5000);
        }, error => {
          console.warn(error);
          this.updateFailed = true;
          setTimeout(() => this.updateFailed = false, 5000);
        })
      }
    }
  }

  edit(attribute) {
    if (this.editable === attribute) {
      this.editable = '';
    } else {
      this.editable = attribute;
    }
  }

  restoreChange() {
    if (window.confirm('Restore All Changes?')) {
      this.editable = '';
      this.newUser = Object.assign({}, this.user);
      this.newUser.batch.batchNumber = this.oldBatchNumber;
      this.newUser.batch.batchLocation = this.oldBatchLocation;
    }
  }
}
