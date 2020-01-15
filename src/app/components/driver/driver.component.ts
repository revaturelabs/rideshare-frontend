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

  userDriver : User ;

  riders: User[];

  location = '';   
   
   
   
  constructor(private userService: UserService, public router: Router, private authService: AuthService) { }

  
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

   
    changeAcceptingRides(userdriver){
       if(userdriver.acceptingRides == true){
        userdriver.acceptingRides = false;
      this.userService.changeDriverIsAccepting (this.userDriver);
      
    }
    else {
      userdriver.acceptingRides = true;
      this.userService.changeDriverIsAccepting(this.userDriver);
            
    }
  }

  

  logout() {
    this.router.navigate(['']);
  }
}


