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

  userdiver : User [];

  riders: User[];

  userId = ''; 
  userName = '';
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
          this.userdiver = data;
          console.log ("Driver", this.userdiver);
          this.location = data.batch.batchLocation;
          console.log ("location", this.location);

          this._MarkInactiveDriverService_.getRidersForLocation(this.location)
          .subscribe(
            data=> {
              this.riders = data;
            });
            console.log ("Driver", this.userdiver);
        })
      };

 

   
  
    changeAcceptingRides(userdiver){
       if(userdiver.acceptingRides == true){
        userdiver.acceptingRides = false;
      this._MarkInactiveDriverService_.changeDriverIsAccepting (this.userdiver);
      
    }
    else {
      console.log ("driver else before", this.userdiver);
      userdiver.acceptingRides = true;
      this._MarkInactiveDriverService_.changeDriverIsAccepting(this.userdiver);
      console.log ("driver else after", this.userdiver);
      
      
    }
  }

  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}


