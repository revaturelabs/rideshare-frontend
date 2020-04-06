import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  profileObject : User;
  currentUser: any = '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success: boolean;
  statusMessage: string;

  // validation
  firstNameError :string;
  lastNameError :string;
  emailError :string;
  phoneNumberError :string;

  constructor(private _ngZone: NgZone, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getLoggedInUser().subscribe((response)=>{
      if (response){
        this.profileObject = response;
        this.firstName = this.profileObject.firstName;
        this.lastName = this.profileObject.lastName;
        this.email = this.profileObject.email;
        this.phone = this.profileObject.phoneNumber;
      }

    });
    
  }

 resetStatusFields(){
  this.firstNameError = '';
  this.lastNameError = '';
  this.phoneNumberError ='';
  this.emailError ='';
  this.statusMessage = '';
 }

  updatesContactInfo(){
    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    
    this.resetStatusFields();

    //Format phone
    let phone = this.phone.replace(/[^\w\s]/gi, '');
    if(phone.length == 10){
    phone = phone.substring(0,3)+"-"+phone.substring(3,6)+"-"+phone.substring(6,10);
    console.log(phone);
    this.profileObject.phoneNumber = phone;
    }else{
      this.profileObject.phoneNumber = phone;
    }


    this.userService.updateUserInfo(this.profileObject).subscribe(
      resp => {     
        if (resp) {
          this.statusMessage = "Updated Successfully!";
          this.success = true;
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => { this.resetStatusFields(); }, 2500);
          });
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error){
          this.statusMessage = 'Update failed. Please resolve above error(s).';
          this.success = false;
          let errors = err.error;
          console.log(errors);
          if(errors.firstName){
            this.firstNameError = errors.firstName[0];
          }
          if(errors.lastName){
            this.lastNameError = errors.lastName[0];           
          }
          if(errors.phoneNumber){
            this.phoneNumberError = errors.phoneNumber[0];
          }
          if(errors.email){
            this.emailError = errors.email[0];
          }
        }
      }
    ); // end of subscribe
  }


}