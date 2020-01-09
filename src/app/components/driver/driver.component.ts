import { Component, OnInit } from '@angular/core';
import { MarkInactiveDriverService } from '../../services/mark-inactive-driver-service/mark-inactive-driver.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';



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
   
   
   
   
  constructor(private markInactiveDriverService: MarkInactiveDriverService,  private router: Router) { }

  
  ngOnInit() {
    
    
    
    this.markInactiveDriverService.getDriverById(this.token).
      subscribe(
        data => {
          console.log ("Data", data);
          this.userDriver = data;
          console.log ("Driver", this.userDriver);
          this.location = data.batch.batchLocation;
          console.log ("location", this.location);

          this.markInactiveDriverService.getRidersForLocation(this.location)
          .subscribe(
            data=> {
              this.riders = data;
            });
            console.log ("Driver", this.userDriver);
        })
      };

 

   
  
    changeAcceptingRides(userdriver){
       if(userdriver.acceptingRides == true){
        userdriver.acceptingRides = false;
      this.markInactiveDriverService.changeDriverIsAccepting (this.userDriver);
      
    }
    else {
      console.log ("driver else before", this.userDriver);
      userdriver.acceptingRides = true;
      this.markInactiveDriverService.changeDriverIsAccepting(this.userDriver);
      console.log ("driver else after", this.userDriver);
      
      
    }
  }

  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}


