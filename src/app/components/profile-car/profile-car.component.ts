import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  make: string;
  model:string;
  year: number;
  color: string;
  nrSeats:number;
  currentCar: Car;
  success :string;
  userId: number;
  hasCar: boolean = false;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.userId = +sessionStorage.getItem("userid");
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      if(response != null){ 
        this.currentCar = response;
        this.color = response.color;
        this.year = response.year;
        this.make = response.make;
        this.model = response.model;
        this.nrSeats = response.seats;
        this.hasCar = true;
      }
    });
  }

  updatesCarInfo(){
    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.seats = this.nrSeats;
    this.currentCar.year = this.year;
    this.currentCar.color = this.color;
    this.carService.updateCarInfo(this.currentCar);
    this.success = "Updated Successfully!";
  }

  addCar(){
    let car:Car = new Car();
    car.make = this.make;
    car.model = this.model;
    car.seats = this.nrSeats;
    car.color = this.color;
    car.year = this.year;
    this.carService.createCar(car, this.userId);
    this.hasCar = true;
  }

}
