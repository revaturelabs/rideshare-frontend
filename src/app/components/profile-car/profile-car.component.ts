import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { CarServiceService } from 'src/app/services/car-service.service';

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

  constructor(private carService: CarServiceService) { }

  ngOnInit() {
    // this.userId = +sessionStorage.getItem("userid");
    // this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
    //   if(response != null){ 
    //     this.currentCar = response;
    //     this.color = response.color;
    //     this.year = response.car_year;
    //     this.make = response.make;
    //     this.model = response.model;
    //     this.nrSeats = response.available_seats;
    //     this.hasCar = true;
    //   }
    // });
  }

  updatesCarInfo(){
    // this.currentCar.make = this.make;
    // this.currentCar.model= this.model;
    // this.currentCar.available_seats = this.nrSeats;
    // this.currentCar.car_year = this.year;
    // this.currentCar.color = this.color;
    // this.carService.updateCarInfo(this.currentCar);
    // this.success = "Updated Successfully!";
  }

  addCar(){
    // let car:Car = new Car();
    // car.car_id = 0;
    // car.make = this.make;
    // car.model = this.model;
    // car.available_seats = this.nrSeats;
    // car.color = this.color;
    // car.car_year = this.year;
    // this.carService.createCar(car, this.userId);
    // this.hasCar = true;
  }

}
