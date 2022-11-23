import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  hState: string;
  hZipcode: number;
  hCity:string;
  hAddress:string;

  wState: string;
  wZipCode:number;
  wCity:string;
  wAddress:string;

  currentUser: User;
  success :string;
  showworkaddress:string;

  constructor(private userService: UserService) { }

  ngOnInit() {
   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;

      this.hZipcode = response.hZip;
      this.hCity = response.hCity;
      this.hAddress = response.hAddress;
      this.hState = response.hState;

      this.wZipCode = response.wZip;
      this.wCity = response.wCity;
      this.wAddress = response.wAddress;
      this.wState = response.wState;
    });
  }

  updatesContactInfo(){
    this.currentUser.hZip = this.hZipcode;
    this.currentUser.hCity = this.hCity;
    this.currentUser.hAddress = this.hAddress;
    this.currentUser.hState = this.hState;

    if (this.showworkaddress == "Yes"){ 
      this.currentUser.wZip = this.wZipCode;
      this.currentUser.wCity = this.wCity;
      this.currentUser.wAddress = this.wAddress;
      this.currentUser.wState = this.wState;
    }
    else{
      this.currentUser.wZip = this.hZipcode;
      this.currentUser.wCity= this.hCity;
      this.currentUser.wAddress = this.hAddress;
      this.currentUser.wState = this.hState;
    }

    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }
}
