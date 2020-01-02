import { Component, OnInit } from '@angular/core';
import { MarkInactiveDriverService } from '../mark-inactive-driver.service';
import { Drivers } from '../mock-driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private _MarkInactiveDriverService_: MarkInactiveDriverService) { }

  // ngOnInit() {
  //   this._MarkInactiveDriverService_.getDriverById(Drivers).
  //     subscribe(
  //       data => {this.driver = data;})
  // }

  ngOnInit() {
    this._MarkInactiveDriverService_.showAllUser()
    .subscribe(
      data=> {
        this.driver = data;
      }
    )
  }

    driver = Drivers;

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

  changeAcceptingRides(userid: number, userName: string, firstName: string, lastName: string, email: string, phoneNumber:string, batch: object, active: boolean, isAccepting: boolean){
    if(isAccepting == true){
      isAccepting = false;
      this._MarkInactiveDriverService_.changeDriverIsAccepting (userid, userName, firstName, lastName, email, phoneNumber, batch, active, isAccepting);
      alert("Successfully changed to accapting rides!");
      //window.location.reload();
    }
    else {
      isAccepting = true;
      this._MarkInactiveDriverService_.changeDriverIsAccepting(userid, userName, firstName, lastName, email, phoneNumber, batch, active, isAccepting);
      alert("Successfully changed to not accapting rides!");
      //window.location.reload();
    }
  }

}
