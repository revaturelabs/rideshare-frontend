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

  driver : User [];

  riders: User[];

  

   token = parseInt(sessionStorage.getItem("auth"));
   
   location = '';
   
   
  constructor(private _MarkInactiveDriverService_: MarkInactiveDriverService,  private router: Router) { }

  
  ngOnInit() {
    
    
    
    this._MarkInactiveDriverService_.getDriverById(this.token).
      subscribe(
        data => {
          this.driver = data;
          console.log ("Driver", this.driver);
          this.location = data.batch.batchLocation;
          console.log ("location", this.location);

          this._MarkInactiveDriverService_.getRidersForLocation(this.location)
          .subscribe(
            data=> {
              this.riders = data;
            });
            console.log ("Driver", this.driver);
        })
      };

 

   
  
    changeAcceptingRides(driver){
       if(driver.acceptingRides == true){
      driver.acceptingRides = false;
      this._MarkInactiveDriverService_.changeDriverIsAccepting (this.driver);
      
    }
    else {
      console.log ("driver else before", this.driver);
      driver.acceptingRides = true;
      this._MarkInactiveDriverService_.changeDriverIsAccepting(this.driver);
      console.log ("driver else after", this.driver);
      
      
    }
  }

  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}


