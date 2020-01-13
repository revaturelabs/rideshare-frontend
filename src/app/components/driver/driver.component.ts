import { Component, OnInit } from '@angular/core';
import { MarkInactiveDriverService } from '../../services/mark-inactive-driver-service/mark-inactive-driver.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';




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
          this.userDriver = data;
          this.location = data.batch.batchLocation;
          this.markInactiveDriverService.getRidersForLocation(this.location)
          .subscribe(
            data=> {
              this.riders = data;
            });
         })
      };

   
    changeAcceptingRides(userdriver){
       if(userdriver.acceptingRides == true){
        userdriver.acceptingRides = false;
      this.markInactiveDriverService.changeDriverIsAccepting (this.userDriver);
      
    }
    else {
      userdriver.acceptingRides = true;
      this.markInactiveDriverService.changeDriverIsAccepting(this.userDriver);
            
    }
  }

  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}


