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

  profileObject : User = new User();
  currentUser: any = '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success :string;
  //set batch object
  //set address
  profileContact = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email] ),
    phone: new FormControl("", [Validators.required, Validators.minLength(10)] )
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
     
    this.profileObject = this.currentUser;
   
    //this.profileObject.userId =Number(sessionStorage.getItem("userid"));
    this.profileObject.firstName = this.profileContact.value.firstName;
    this.profileObject.lastName = this.profileContact.value.lastName;
    this.profileObject.email = this.profileContact.value.email;
    this.profileObject.phoneNumber = this.profileContact.value.phone;
    //add batch
    //add address

    console.log(this.profileObject);
    //this.userService.updateUserInfo1(this.profileObject);
    console.log("fname " + this.validInput.firstName.valid)
    console.log("lname " +this.validInput.lastName.valid)
    console.log("email " +this.validInput.email.valid)
    console.log("phone " +this.validInput.phone.valid)

    if(this.validInput.firstName.valid && this.validInput.lastName.valid && this.validInput.email.valid && this.validInput.phone.valid)
    {
        //update user info here
        this.userService.updateUserInfo1(this.profileObject).then(res=>{
         this.success = "Updated Successfully!";
         }).catch(error=>{
          this.success = "Error occurred, Update was unsucessful"
          })
        
    } else{
      console.log("check invalid")
      this.success ="Invalid Inputs";
    }   
  }

  get validInput(){
    return this.profileContact.controls;
  }

  

}
