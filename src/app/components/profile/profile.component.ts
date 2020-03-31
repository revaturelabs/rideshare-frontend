import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 *
 *
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /**
   *Creates an instance of ProfileComponent.
   * @param {Router} router
   * @memberof ProfileComponent
   */
  constructor( private router: Router) { }
  showCont :boolean = false;
  showCar :boolean = false;
  showLocation :boolean = false;
  showMemberInfo :boolean = false;

  contact :string = '';
  car :string = '';
  location :string = '';
  membership :string = '';

  /**
   * OnInit function
   */
  ngOnInit() {
    this.showCont = true;
  /**
   * A GET method that retrieves user's information
   */
}
/**
 * Function that shows contact info
 *
 * @memberof ProfileComponent
 */
showContact() {
    this.showCont = true;
    this.showCar = false;
    this.showLocation = false;
    this.showMemberInfo = false;

    this.contact = 'profileBtn';
    this.car = '';
    this.location = '';
    this.membership = '';

  }
/**
 * Function that shows location
 *
 * @memberof ProfileComponent
 */
showLoc(){
    this.showCont = false;
    this.showCar = false;
    this.showLocation = true;
    this.showMemberInfo = false;

    this.contact = '';
    this.car = '';
    this.location = 'profileBtn';
    this.membership = '';
  }
/**
 * Function that shows membership
 *
 * @memberof ProfileComponent
 */
showMembership(){
    this.showCont = false;
    this.showCar = false;
    this.showLocation = false;
    this.showMemberInfo = true;

    this.contact = '';
    this.car = '';
    this.location = '';
    this.membership = 'profileBtn';
  }
/**
 * Function that shows car info
 *
 * @memberof ProfileComponent
 */
showCarInfo(){
    this.showCont = false;
    this.showCar = true;
    this.showLocation = false;
    this.showMemberInfo = false;

    this.contact = '';
    this.car = 'profileBtn';
    this.location = '';
    this.membership = '';

  }
}
