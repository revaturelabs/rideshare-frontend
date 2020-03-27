import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
/**
 *
 *
 * @export
 * @class ProfileContactComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {
/**
 *
 *
 * @type {User}
 * @memberof ProfileContactComponent
 */
profileObject : User;
  currentUser: any = '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success :string;
  /**
   *Creates an instance of ProfileContactComponent.
   * @param {Router} router
   * @param {UserService} userService
   * @memberof ProfileContactComponent
   */
  constructor(private router: Router, private userService: UserService) { }
/**
 *
 *
 * @memberof ProfileContactComponent
 */
ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;

      this.firstName = this.profileObject.firstName;
      this.lastName = this.profileObject.lastName;
      this.email = this.profileObject.email;
      this.phone = this.profileObject.phoneNumber;

    });

  }
/**
 *
 *
 * @memberof ProfileContactComponent
 */
updatesContactInfo(){
    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    this.profileObject.phoneNumber = this.phone;

    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
  }


}
