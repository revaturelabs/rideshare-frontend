import { Component, OnInit } from '@angular/core';
import { MarkInactiveDriverService } from '../mark-inactive-driver.service';
import { ListUsers } from 'src/app/ListUsers';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  private driver : ListUsers [];

  private listofUsers: ListUsers[];

   token: number = 1;

   
   
  constructor(private _MarkInactiveDriverService_: MarkInactiveDriverService, private adminservice: AdminService) { }

  ngOnInit() {
    console.log ("driver", this.driver);
    this._MarkInactiveDriverService_.getDriverById(this.token).
      subscribe(
        data => {
          console.log(data)
          this.driver = data;
          console.log ("driver", this.driver);
        });
        this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.listofUsers = data;
      }
    )
        // console.log ("driver Name", this.driver.firstName);
  }

    
  
  // ngOnInit() {
  //   this._MarkInactiveDriverService_.showAllUser()
  //   .subscribe(
  //     data=> {
  //       this.driver = data;
  //     }
  //   )
  // }

    

  // changeAcceptingRides(){
  //   this._MarkInactiveDriverService_.changeDriverIsAccepting(this.Driver).subscribe(res => {
  //     if (res){
  //       alert("Successfully changed!");
  //     }
  //     else{
  //       alert("Some error happened")
  //     }
  //   })
  // }

  changeAcceptingRides(driver){
    console.log ("driver before ", this.driver);
    if(driver.acceptingRides == true){
      driver.acceptingRides = false;
      this._MarkInactiveDriverService_.changeDriverIsAccepting (this.driver);
      console.log ("driver after", this.driver);
      alert("Successfully changed to accapting rides!");
      //window.location.reload();
      
    }
    else {
      console.log ("driver else before", this.driver);
      driver.acceptingRides = true;
      this._MarkInactiveDriverService_.changeDriverIsAccepting(this.driver);
      console.log ("driver else after", this.driver);
      alert("Successfully changed to not accapting rides!");
      //window.location.reload();
      console.log ("driver", this.driver);
    }
  }

}
