import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';


@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  carObject : Car;
  currentCar: any = '';
  make: string;
  model: string;
  seats: string;


  constructor(private carService : CarService) { }

  ngOnInit() {
    this.currentCar = this.carService.getCarByUserId2( sessionStorage.getItem("userid")).subscribe((response) => {
      this.carObject = response;
    });
  }

  updatesCarInfo(){

  }

}
