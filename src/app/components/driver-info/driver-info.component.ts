import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';


@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {

  private availableCars: Car[] = [];

  orderYear: boolean = false;
  orderFirstName: boolean = false;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getAllCars().subscribe(
      data => {
        this.availableCars = data.filter(car => car.user.acceptingRides);
      }
    )
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
  
}
