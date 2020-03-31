import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ValidationService } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  firstNameError: string = "";
  lastNameError: string = "";
  emailError: string = "";
  phoneError: string = "";

  profileObject : User;
  currentUser: any = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  result: string = "Updated Successfully!";
  resultColor: string = "red";
  resultVisible: string = "hidden";
  constructor(
    private router: Router, 
    private userService: UserService,
    private validationService: ValidationService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;

      this.firstName = this.profileObject.firstName;
      this.lastName = this.profileObject.lastName;
      this.email = this.profileObject.email;
      this.phone = this.profileObject.phoneNumber;

    });
    
  }

  updatesContactInfo(){

    if(!this.validateForm()) {

      this.result = "Please correct errors";
      this.resultColor = "red";
      this.resultVisible = "visible";
      return;
    }

    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    this.profileObject.phoneNumber = this.phone;

    this.userService.updateUserInfo(this.profileObject).subscribe(data => {

      this.result = "Updated Successfully!";
      this.resultColor = "green";
      this.resultVisible = "visible";
    },
    error => {

      this.result = "Error " + error.status;
      this.resultColor = "red";
      this.resultVisible = "visible";
    });
  }

  validateForm() {

    const isFirstNameValid = this.validateFirstName();
    const isLastNameValid = this.validateLastName();
    const isEmailValid = this.validateEmail();
    const isPhoneValid = this.validatePhone();

    if(!isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPhoneValid) {
        return false;
      }

      return true;
  }

  validateFirstName() {
    this.firstName = this.firstName.trim();
    if(!this.firstName) {
      this.firstNameError = "Required";
      return false;
    }
    else {

      const isValid = this.validationService.validateName(this.firstName);
      if(isValid) {
        this.firstNameError = "";
        this.firstName = this.validationService.nameFormat(this.firstName);
        return true;
      }
      else {
        this.firstNameError = "Invalid";
        return false;
      }
    }
  }

  validateLastName() {
    this.lastName = this.lastName.trim();
    if(!this.lastName) {
      this.lastNameError = "Required";
      return false;
    }
    else {

      const isValid = this.validationService.validateName(this.lastName);
      if(isValid) {
        this.lastNameError = "";
        this.lastName = this.validationService.nameFormat(this.lastName);
        return true;
      }
      else {
        this.lastNameError = "Invalid";
        return false;
      }
    }
  }

  validateEmail() {
    this.email = this.email.trim();
    if(!this.email) {
      this.emailError = "Required";
      return false;
    }
    else {

      const isValid = this.validationService.validateEmail(this.email);

      if(isValid) {
        this.emailError = "";
        return true;
      }
      else {
        this.emailError = "Invalid";
        return false;
      }
    }
  }

  validatePhone() {
    this.phone = this.phone.trim();
    if(!this.phone) {
      this.phoneError = "Required";
      return false;
    }
    else {

      const isValid = this.validationService.validatePhone(this.phone);
      if(isValid) {
        this.phoneError = "";
        return true;
      }
      else {
        this.phoneError = "Invalid";
        return false;
      }
    }
  }

  onFirstNameChange() {
    this.resultVisible = "hidden";
    this.validateFirstName();
  }

  onLastNameChange() {
    this.resultVisible = "hidden";
    this.validateLastName();
  }

  onEmailChange() {
    this.resultVisible = "hidden";
    this.validateEmail();
  }

  onPhoneChange() {
    this.resultVisible = "hidden";
    this.validatePhone();
  }
}
