import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Batch } from 'src/app/models/batch';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/services/batch-service/batch.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  page = 1;
  pageSize =10;
  items = [];

  batches: Batch[] = [];
  allAvailableCars: Car[] = [];
  availableCars: Car[] = [];

  constructor(private carService: CarService, private authService: AuthService, private router: Router, private batchService: BatchService) {
   
  }

  ngOnInit() {
    let userId = this.authService.user.userId;
    if (!userId) {
      this.router.navigate(['']);
    } else {
      this.carService.getAllCars().subscribe(
        data => {
          this.allAvailableCars = data.filter(car => car.user.acceptingRides);
          this.orderByLocation();
        }
      )
      this.batches = this.batchService.getAllBatches();
    }
  }

  /**
   * A function the sorts the car object by batch location
   */

  orderByLocation() {
    let userLocation = this.authService.user.batch.batchLocation;

    this.allAvailableCars.sort((a, b) => a.user.batch.batchLocation > b.user.batch.batchLocation ? 1 : -1);
    this.allAvailableCars = this.allAvailableCars.filter(car => car.user.batch.batchLocation === userLocation).concat(this.allAvailableCars.filter(car => car.user.batch.batchLocation !== userLocation));
    this.availableCars = this.allAvailableCars;
  }


}
