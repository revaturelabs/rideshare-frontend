import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
/**
 *
 *
 * @export
 * @class ProfileMembershipComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  /**
   *
   *
   * @type {User}
   * @memberof ProfileMembershipComponent
   */
  profileObject : User;
  currentUser: any = '';
  isDriver: boolean;
  active: boolean;
  success: string;
  /**
   *Creates an instance of ProfileMembershipComponent.
   * @param {UserService} userService
   * @memberof ProfileMembershipComponent
   */
  constructor(private userService: UserService) { }
 /**
  *
  *
  * @memberof ProfileMembershipComponent
  */
 ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
    });
  }
  /**
   *
   *
   * @memberof ProfileMembershipComponent
   */
  updatesMembershipInfo(){
    this.profileObject.isDriver = this.isDriver;
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
  }
}
