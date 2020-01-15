import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LogService } from 'src/app/services/log.service';

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

  constructor(private log: LogService, private router: Router, private userService: UserService, private batchService: BatchService, public validationService: ValidationService, private authService: AuthService) { }

  ngOnInit() {
    this.user.userId = this.authService.user.userId;;
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

          this.batches = this.batchService.getAllBatches();
          this.batches = this.batches.filter(batch => batch.batchNumber === this.user.batch.batchNumber).concat(this.batches.filter(batch => batch.batchNumber !== this.user.batch.batchNumber))
        } else {
          this.authService.user = {};
          this.router.navigate(['']);
        }
      })
  }

  compareUser() {
    return this.user.firstName.toLowerCase() === this.newUser.firstName.toLowerCase() && this.user.lastName.toLowerCase() === this.newUser.lastName.toLowerCase() && this.user.userName === this.newUser.userName && this.user.email === this.newUser.email && this.validationService.phoneFormat(this.user.phoneNumber) === this.validationService.phoneFormat(this.newUser.phoneNumber) && this.user.batch.batchNumber === this.oldBatchNumber;
  }

  updateProfile() {
    if (this.validationService.validateUserName(this.newUser.userName) && this.validationService.validateName(this.newUser.firstName) && this.validationService.validateName(this.newUser.lastName) && this.validationService.validateEmail(this.newUser.email) && this.validationService.validatePhone(this.newUser.phoneNumber)) {
      this.editable = '';
      if (this.compareUser()) {
        this.noChange = true;
        this.newUser = Object.assign({}, this.user);
        setTimeout(() => this.noChange = false, 3000);
      } else {
        this.newUser.firstName = this.validationService.nameFormat(this.newUser.firstName);
        this.newUser.lastName = this.validationService.nameFormat(this.newUser.lastName);
        this.newUser.phoneNumber = this.validationService.phoneFormat(this.newUser.phoneNumber);
        this.newUser.batch.batchLocation = this.user.batch.batchLocation;
        this.newUser.batch.batchNumber = this.user.batch.batchNumber;

        this.userService.updateUserInfo(this.newUser).then(response => {
          this.authService.user = response;
          this.log.info("updated user info: " + '\n' + JSON.stringify(response));          
          this.getUserInfo();
          this.updateSuccess = true;
          setTimeout(() => this.updateSuccess = false, 5000);
        }, error => {
          this.log.error(error);
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
    this.editable = '';
    this.newUser = Object.assign({}, this.user);
    this.newUser.batch.batchNumber = this.oldBatchNumber;
    this.newUser.batch.batchLocation = this.oldBatchLocation;
  }
}
