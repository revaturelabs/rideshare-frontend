import { Component, OnInit } from '@angular/core';
import { MarkInactiveDriverService } from '../mark-inactive-driver.service';
import { ListUsers } from 'src/app/ListUsers';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  private driver : ListUsers [];

  private listofUsers: ListUsers[];

   token = parseInt(sessionStorage.getItem("auth"));

   
   
  constructor(private _MarkInactiveDriverService_: MarkInactiveDriverService, private adminservice: AdminService, private router: Router) { }

  ngOnInit() {
    console.log ("driver before ngOnit", this.driver);
    this._MarkInactiveDriverService_.getDriverById(this.token).
      subscribe(
        data => {
          console.log(data)
          this.driver = data;
          console.log ("driver after ngOnit", this.driver);
        });
        this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.listofUsers = data;
      });
        // console.log ("driver Name", this.driver.firstName);
  }

    
  
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


