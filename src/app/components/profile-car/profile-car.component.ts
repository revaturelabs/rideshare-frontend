import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {
  profileObject: Car = new Car();
  currentCar: any = '';
  make: string;
  model:string;
  nrSeats:number;
  success :string;

  constructor(private router: Router, private carService: CarService) { }

  ngOnInit() {

    this.currentCar = this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
      this.make = response.make;
      this.model = response.model;
      this.nrSeats = response.seats;

    });
  }

  updatesCarInfo(){
    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.seats = this.nrSeats;
    //console.log(this.currentUser);
    this.carService.updateCarInfo(this.currentCar, sessionStorage.getItem("userid"));
    this.success = "Updated Successfully!";
  }

}
