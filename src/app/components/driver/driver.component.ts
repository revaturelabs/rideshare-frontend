import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';




@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  userDriver : User ;

  riders: User[];

  location = '';




   token = parseInt(sessionStorage.getItem("auth"));
   
   
   
   
  constructor(private userService: UserService,  private router: Router) { }

  
  ngOnInit() {
    
    
    
    this.userService.getDriverById(this.token).
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
      };

   
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
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}


