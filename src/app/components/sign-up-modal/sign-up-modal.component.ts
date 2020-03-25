import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  fname: string;
  lname: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  isDriver: boolean;
  isRider: boolean;
  submitMessage: string = "Please correct errors";
  submitMessageColor: string = "red";
  submitMessageVisible: string = "hidden";

  user: User = new User();
  batch: Batch = new Batch();
  batches: Batch[];
  // validation
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneNumberError: string;
  userNameError: string;
  batchError: string;
  hAddressError: string;
  hStateError: string;
  hCityError: string;
  hZipError: string;

  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef: BsModalRef;
  states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
    'WI', 'WY'];
  constructor(private modalService: BsModalService, private userService: UserService, private batchService: BatchService, private validationService: ValidationService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        //console.log(res);
      }
    );

    this.batchService.getAllBatchesByLocation1().subscribe(
      res => {
        this.batches = res;
      },
    );
  }
  //Opens 'sign up' modal that takes in a template of type 'ng-template'.

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitUser() {

    if(!this.validateForm()) {
      this.submitMessage = "Please correct errors";
      this.submitMessageColor = "red";
      this.submitMessageVisible = "visible";
      return;
    }
    else {
      this.submitMessageVisible = "hidden";
    }

    this.user.userId = 0;
    this.firstNameError = '';
    this.lastNameError = '';
    this.phoneNumberError = '';
    this.userNameError = '';
    this.emailError = '';
    this.hStateError = '';
    this.hAddressError = '';
    this.hCityError = '';
    this.hZipError = '';
    this.user.wAddress = this.user.hAddress;
    this.user.wState = this.user.hState;
    this.user.wCity = this.user.hCity;
    this.user.wZip = this.user.hZip;
    let driver = <HTMLInputElement>document.getElementById("driver");
    let rider = <HTMLInputElement>document.getElementById("rider");

    if (driver.checked == true) {
      this.user.isDriver = true;
    }
    if (rider.checked == true) {
      this.user.isDriver = false;
    }
    //console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      res => {
        
        console.log(res);
        let i = 0;
        if (res.firstName != undefined) {
          this.firstNameError = res.firstName[0]; //additional server validation
          i = 1;
        }
        if (res.lastName != undefined) {
          this.lastNameError = res.lastName[0];
          i = 1;

        }
        if (res.phoneNumber != undefined) {
          this.phoneNumberError = res.phoneNumber[0];
          i = 1;

        }
        if (res.email != undefined) {
          this.emailError = res.email[0];
          i = 1;

        }
        if (res.userName != undefined) {
          this.userNameError = res.userName[0];
          i = 1;

        }
        if (res.hState != undefined) {
          this.hStateError = res.hState[0];
          i = 1;

        }
        if (res.hAddress != undefined) {
          this.hAddressError = res.hAddress[0];
          i = 1;

        }
        if (res.hCity != undefined) {
          this.hCityError = res.hCity[0];
          i = 1;

        }
        if (res.hZip != undefined) {
          this.hZipError = res.hZip[0];
          i = 1;

        }
        if (i === 0) {
          i = 0;

          this.submitMessage = "Registered successfully";
          this.submitMessageColor = "green";
          this.submitMessageVisible = "visible";
        }
      }
      /*res => {
        console.log("failed to add user");
        console.log(res);
      }*/
    );
  }

  validateForm() : boolean {
    const isFirstValid = this.validateFirstName();
    const isLastValid = this.validateLastName();
    const isEmailValid = this.validateEmail();
    const isPhoneValid = this.validatePhoneNumber();
    const isUsernameValid = this.validateUsername();
    const isBatchValid = this.validateBatch();
    const isAddressValid = this.validateAddress();
    const isCityValid = this.validateCity();
    const isStateValid = this.validateState();
    const isZipValid = this.validateZip();

    if(!isFirstValid ||
      !isLastValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isUsernameValid ||
      !isBatchValid ||
      !isAddressValid ||
      !isCityValid ||
      !isStateValid ||
      !isZipValid) {
        return false;
      }

      return true;
  }

  onFirstNameChange() {

    this.validateFirstName();
  }
  validateFirstName() : boolean {
    if(!this.user.firstName) {
      this.firstNameError = "Required";
      return false;
    }
    else if(!this.validationService.validateName(this.user.firstName)) {
      this.firstNameError = "Invalid Format";
      return false;
    }
    else {
      this.user.firstName = this.validationService.nameFormat(this.user.firstName);
      this.firstNameError = "";
      return true;
    }
  }

  onLastNameChange() {
    this.validateLastName();
  }
  validateLastName() : boolean {
    if(!this.user.lastName) {
      this.lastNameError = "Required";
      return false;
    }
    else if(!this.validationService.validateName(this.user.lastName)) {
      this.lastNameError = "Invalid Format";
      return false;
    }
    else {
      this.user.lastName = this.validationService.nameFormat(this.user.lastName);
      this.lastNameError = "";
      return true;
    }
  }

  onEmailChange() {
    this.validateEmail();
  }
  validateEmail() : boolean {
    if(!this.user.email) {
      this.emailError = "Required";
      return false;
    }
    else if(!this.validationService.validateEmail(this.user.email)) {
      this.emailError = "Invalid Format";
      return false;
    }
    else {
      this.emailError = "";
      return true;
    }
  }

  onPhoneNumberChange() {
    this.validatePhoneNumber();
  }
  validatePhoneNumber() : boolean {
    if(!this.user.phoneNumber) {
      this.phoneNumberError = "Required";
      return false;
    }
    else if(!this.validationService.validatePhone(this.user.phoneNumber)) {
      this.phoneNumberError = "Invalid Format";
      return false;
    }
    else {
      this.phoneNumberError = "";
      return true;
    }
  }

  onUsernameChange() {
    this.validateUsername();
  }
  validateUsername() : boolean {
    if(!this.user.userName) {
      this.userNameError = "Required";
      return false;
    }
    else if(!this.validationService.validateUserName(this.user.userName)) {
      this.userNameError = "Invalid Format";
      return false;
    }
    else {
      this.userNameError = "";
      return true;
    }
  }

  onBatchChange() {
    this.validateBatch();
  }
  validateBatch() : boolean {
    //batch is not required on the backend, so allowing blank
    return true;
  }

  //todo: address verification using Google Maps
  //verification needs to be identical everywhere in client
  onAddressChange() {
    this.validateAddress();
  }
  validateAddress() : boolean {
    if(!this.user.hAddress) {
      this.hAddressError = "Required";
      return false;
    }
    else {
      this.hAddressError = "";
      return true;
    }
  }

  onCityChange() {
    this.validateCity();
  }
  validateCity() : boolean {
    if(!this.user.hCity) {
      this.hCityError = "Required";
      return false;
    }
    else {
      this.hCityError = "";
      return true;
    }
  }

  onStateChange() {
    this.validateState();
  }
  validateState() : boolean {
    if(!this.user.hState) {
      this.hStateError = "Required";
      return false;
    }
    else {
      this.hStateError = "";
      return true;
    }
  }

  onZipChange() {
    this.validateZip();
  }
  validateZip() : boolean {
    if(!this.user.hZip) {
      this.hZipError = "Required";
      return false;
    }
    else {
      this.hZipError = "";
      return true;
    }
  }
}
