import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider.service';
//import { Driver } from 'src/app/models/driver.model'; 
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {

  private drivers: User[]; 

  constructor(private riderService: RiderService) { }

  ngOnInit() {
    this.riderService.showAllDrivers().subscribe(
      data => {
        if (data.isDriver) {
          this.drivers.push(data); 
        }
      })
  }

  // displayContactInformation(data) {
    
    
  // }



}
