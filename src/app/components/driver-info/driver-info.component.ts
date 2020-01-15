import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';


@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {

  batches: Batch[] = [];
  allAvailableCars: Car[] = [];
  availableCars: Car[] = [];

  orderYear: boolean = false;
  orderFirstName: boolean = false;

  searchName: string = '';
  noUserFound: boolean = false;

  constructor(private carService: CarService, private authService: AuthService, private router: Router, private batchService: BatchService) { }

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

  orderByLocation() {
    let userLocation = this.authService.user.batch.batchLocation;

    this.allAvailableCars.sort((a, b) => a.user.batch.batchLocation > b.user.batch.batchLocation ? 1 : -1);
    this.allAvailableCars = this.allAvailableCars.filter(car => car.user.batch.batchLocation === userLocation).concat(this.allAvailableCars.filter(car => car.user.batch.batchLocation !== userLocation));
    this.availableCars = this.allAvailableCars;
  }

  orderByYear() {
    if (!this.orderYear) {
      this.availableCars.sort((a, b) => b.year - a.year);
    } else {
      this.availableCars.sort((a, b) => a.year - b.year);
    }
    this.orderYear = !this.orderYear;
  }

  orderByFullName() {
    if (!this.orderFirstName) {
      this.availableCars.sort((a, b) => a.user.firstName > b.user.firstName ? 1 : -1);
    } else {
      this.availableCars.sort((a, b) => a.user.firstName > b.user.firstName ? -1 : 1);
    }
    this.orderFirstName = !this.orderFirstName;
  }

  searchDriverByName() {
    this.noUserFound = false;
    this.availableCars = this.allAvailableCars.filter(car => `${car.user.firstName} ${car.user.lastName}`.toLowerCase().includes(this.searchName.toLowerCase()));
    if (this.availableCars.length === 0) {
      this.availableCars = this.allAvailableCars;
      this.noUserFound = true;
    }
  }

  filterDriverByLocation(event) {
    this.noUserFound = false;
    this.availableCars = this.allAvailableCars.filter(car => car.user.batch.batchNumber == event.target.value);
    if (this.availableCars.length === 0) {
      this.availableCars = this.allAvailableCars;
      this.noUserFound = true;
    }
  }

  showAllDrivers() {
    this.searchName = '';
    this.orderByLocation();
  }

  hideMessage() {
    this.noUserFound = false;
  }
  
}
