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
  failed : string;

  // validation
  firstNameError :string;
  lastNameError :string;
  emailError :string;
  phoneNumberError :string;

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
    
    //Format phone
    let phone = this.phone.replace(/[^\w\s]/gi, '');
    phone = phone.substring(0,3)+"-"+phone.substring(3,6)+"-"+phone.substring(6,10);
    console.log(phone);
    this.profileObject.phoneNumber = phone;

    this.firstNameError = '';
    this.lastNameError = '';
    this.phoneNumberError ='';
    this.emailError ='';
    this.failed='Update failed. Please resolve above error(s).';
    this.success='';

    this.userService.updateUserInfo(this.profileObject).subscribe(
      res => {
        console.log(res);
        let i = 0;
        if(res.firstName != undefined){
          this.firstNameError = res.firstName[0];
          i = 1;
        }
        if(res.lastName != undefined){
          this.lastNameError = res.lastName[0];
          i = 1;
          
        }
        if(res.phoneNumber != undefined){
          this.phoneNumberError = res.phoneNumber[0];
          i = 1;

        }
        if(res.email != undefined){
          this.emailError = res.email[0];
          i = 1;

        }
        if(i === 0) {
          i = 0;
          this.success = "Updated Successfully!";
          this.failed = '';
        }
      } 
      /*res => {
        console.log("failed to add user");
        console.log(res);
      }*/
    );
  }


}