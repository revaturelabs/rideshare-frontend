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

  userdriver : User ;

  riders: User[];

  userId = ''; 
  userName: string = '';
  batch = ''; 
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  active = '';
  driver = '';
  acceptingRides = '';
  location = '';

   token = parseInt(sessionStorage.getItem("auth"));
   
   
   
   
  constructor(private _MarkInactiveDriverService_: MarkInactiveDriverService,  private router: Router) { }

  
  ngOnInit() {
    
    
    
    this._MarkInactiveDriverService_.getDriverById(this.token).
      subscribe(
        data => {
          console.log ("Data", data);
          this.userdriver = data;
          console.log ("Driver", this.userdriver);
          this.location = data.batch.batchLocation;
          console.log ("location", this.location);

          this._MarkInactiveDriverService_.getRidersForLocation(this.location)
          .subscribe(
            data=> {
              this.riders = data;
            });
            console.log ("Driver", this.userdriver);
        })
      };

 

   
  
    changeAcceptingRides(userdriver){
       if(userdriver.acceptingRides == true){
        userdriver.acceptingRides = false;
      this._MarkInactiveDriverService_.changeDriverIsAccepting (this.userdriver);
      
    }
    else {
      console.log ("driver else before", this.userdriver);
      userdriver.acceptingRides = true;
      this._MarkInactiveDriverService_.changeDriverIsAccepting(this.userdriver);
      console.log ("driver else after", this.userdriver);
      
      
    }
  }

  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}


