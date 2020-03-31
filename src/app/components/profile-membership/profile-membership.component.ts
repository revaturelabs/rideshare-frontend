import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
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
  profileObject: User;
  carObject: Car;
  success: string;
  possibleSeats: Array<Number>;

    /**
   *Creates an instance of ProfileMembershipComponent.
   * @param {UserService} userService
   * @memberof ProfileMembershipComponent
   */
  constructor(private userService: UserService, private carService: CarService) { }

  /**
  * OnInit function
  *
  * @memberof ProfileMembershipComponent
  */
  ngOnInit() {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
    this.profileObject = response;
    });
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.carObject = response;
      this.possibleSeats = new Array(this.carObject.seats + 1).fill(0).map((x,i)=>i);
    });
  }
  /**
   * Function that updates membership info
   *
   * @memberof ProfileMembershipComponent
   */
  updatesMembershipInfo(){
    this.carService.updateCarInfo(this.carObject);
    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
    console.log(this.isDriver);
    console.log(this.profileObject);
  }
}
