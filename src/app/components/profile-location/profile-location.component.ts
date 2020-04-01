import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;
  failed: string;
  emptyAddress: string;
  emptyCity: string;
  emptyZip: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;
      this.zipcode = response.hZip;
      this.city = response.hCity;
      this.address = response.hAddress;
      this.address2 = response.wAddress;
      this.hState = response.hState;

    });
  }

  updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    //console.log(this.currentUser);
    switch(this.currentUser.hCity){
      case '': this.emptyCity = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
              this.success = "";
              break;
      default: this.emptyCity = "";
    }
    switch(this.currentUser.hAddress){
      case '': this.emptyAddress = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
              this.success = "";
              break;
      default: this.emptyAddress = "";
    }
    switch(String(this.currentUser.hZip)){
      case '': this.emptyZip = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
              this.success = "";
              break;
      default: this.emptyZip = "";
    }
    if ((this.currentUser.hAddress !== '') && (this.currentUser.hCity !== '') && (String(this.currentUser.hZip) !== '')) {
      this.userService.updateUserInfo(this.currentUser);
      this.success = "Updated Successfully!";
      this.failed = "";
    }

  }

}
