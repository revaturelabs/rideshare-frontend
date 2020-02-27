import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';




@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  /**
   * Initializing userDriver as an User object and set riders array
   */

  userDriver : User ;

  riders: User[];
  location = '';   
   
  /**
   * Constructor 
   * @param userService An user service is instantiated.
   * @param router Provides an instance of a router.
   * @param authService An auth service is injected.
   */

  
  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    let userId = this.authService.user.userId;
    if (userId) {
      this.userService.getDriverById(userId).
        subscribe(
          data => {
            this.userDriver = data;
            this.location = data.batch.batchLocation;
            this.userService.getRidersForLocation(this.location)
            .subscribe(
              data=> {
                this.riders = data;
              });
          })
        }
      else {
        this.router.navigate(['']);
      }
    }

  /**
   * A PUT method that changes accepting ride status
   * @param userdriver 
   */

    changeAcceptingRides(userdriver){
       if(userdriver.acceptingRides == true){
        userdriver.acceptingRides = false;
      this.userService.updateUserInfo(this.userDriver);
      
    }
    else {
      userdriver.acceptingRides = true;
      this.userService.updateUserInfo(this.userDriver);
            
    }
  }

  /**
   * Logs out the user
   */


  logout() {
    this.router.navigate(['']);
  }
}
