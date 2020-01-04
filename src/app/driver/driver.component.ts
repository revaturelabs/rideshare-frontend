import { Component, OnInit } from '@angular/core';
import { MarkInactiveDriverService } from '../mark-inactive-driver.service';
import { ListUsers } from 'src/app/ListUsers';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  private driver : ListUsers [];

   token: number = 1;

   
   
  constructor(private _MarkInactiveDriverService_: MarkInactiveDriverService) { }

  ngOnInit() {
    console.log ("driver", this.driver);
    this._MarkInactiveDriverService_.getDriverById(this.token).
      subscribe(
        data => {this.driver = data;})
        // console.log ("driver Name", this.driver.firstName);
        // console.log ("driver", this.driver);
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
    if(driver.isAccepting == true){
      driver.isAccepting = false;
      this._MarkInactiveDriverService_.changeDriverIsAccepting (this.driver);
      alert("Successfully changed to accapting rides!");
      //window.location.reload();
      console.log ("driver", this.driver);
    }
    else {
      driver.isAccepting = true;
      this._MarkInactiveDriverService_.changeDriverIsAccepting(this.driver);
      alert("Successfully changed to not accapting rides!");
      //window.location.reload();
      console.log ("driver", this.driver);
    }
  }

}
