import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

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
  success :string;
  failed: string;
  emptyFirst: string;
  emptyLast: string;
  emptyEmail: string;
  emptyPhone: string;
  constructor(private router: Router, private userService: UserService) { }

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
    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    this.profileObject.phoneNumber = this.phone;

    switch(this.profileObject.firstName){
      case '': this.emptyFirst = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION";
              this.success = "";
              break;
      default: this.emptyFirst = "";
    }
    switch(this.profileObject.lastName){
      case '': this.emptyLast = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION";
              this.success = "";
              break;
      default: this.emptyLast = "";
    }
    switch(this.profileObject.phoneNumber){
      case '': this.emptyPhone = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION";
              this.success = "";
              break;
      default: this.emptyPhone = "";
    }
    switch(this.profileObject.email){
      case '': this.emptyEmail = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION";
              this.success = "";
              break;
      default: this.emptyEmail = "";
    }

    if((this.profileObject.email !== '') && (this.profileObject.phoneNumber !== '') 
    && (this.profileObject.firstName !== '') && (this.profileObject.lastName !== '')){
      this.userService.updateUserInfo(this.profileObject);
      this.success = "Updated Successfully!";
      this.failed = "";
    }
    
  }


}
