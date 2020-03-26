import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  make: string;
  model:string;
  nrSeats:number;
  currentCar: Car;
  success :string;
  emptyMake: string;
  emptyModel: string;
  failed: String;

  constructor(private carService: CarService) { }

  ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
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
    switch(this.currentCar.make){
      case '': this.emptyMake = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CAR INFORMATION!";
              this.success = "";
              break;
      default: this.emptyMake = "";
    }
    switch(this.currentCar.model){
      case '': this.emptyModel = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CAR INFORMATION!";
              this.success = "";
              break;
      default: this.emptyModel = "";
    }
    if((this.currentCar.make !== '') && (this.currentCar.model !== '')){
      this.carService.updateCarInfo(this.currentCar);
      this.success = "Updated Successfully!";
      this.failed = ""
    }

  }

}
