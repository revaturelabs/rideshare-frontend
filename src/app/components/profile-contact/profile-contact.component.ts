import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
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
  profileContact = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required ),
    phone: new FormControl("", Validators.required )
  });


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
     this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
     
      if(response != null){
        this.profileContact = new FormGroup({
          firstName: new FormControl(response.firstName, Validators.required),
          lastName: new FormControl(response.lastName, Validators.required),
          email: new FormControl(response.email, Validators.required),
          phone: new FormControl(response.phoneNumber, Validators.required)
        });
      }
      else{
        this.success ="No user information is found"
      }

this.currentUser = response;
    }, error=>{

    });

  }

  updatesContactInfo(){
  
    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    this.profileObject.phoneNumber = this.phone;

    this.userService.updateUserInfo(this.currentUser, this.profileObject);
    this.success = "Updated Successfully!";
  }

  get validInput(){
    return this.profileContact.controls;
  }

  

}
