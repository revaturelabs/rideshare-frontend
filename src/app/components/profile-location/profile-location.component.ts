import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
/**
 *
 *
 * @export
 * @class ProfileLocationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {
/**
 *
 *
 * @type {number}
 * @memberof ProfileLocationComponent
 */
zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;
/**
 *Creates an instance of ProfileLocationComponent.
 * @param {UserService} userService
 * @memberof ProfileLocationComponent
 */
constructor(private userService: UserService) { }
/**
 *
 *
 * @memberof ProfileLocationComponent
 */
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
/**
 *
 *
 * @memberof ProfileLocationComponent
 */
updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }
}
