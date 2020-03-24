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

  makeError: string = "";
  modelError: string = "";
  nrSeatsError: string = "";

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

    if(!this.validateForm()) {
      return;
    }

    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.seats = this.nrSeats;
    //console.log(this.currentUser);
    this.carService.updateCarInfo(this.currentCar);
    this.success = "Updated Successfully!";
  }

  onMakeChange() {
    this.validateMake();
  }

  onModelChange() {
    this.validateModel();
  }

  onNrSeatsChange() {
    this.validateNrSeats();
  }

  validateForm() {

    const isMakeValid = this.validateMake();
    const isModelValid = this.validateModel();
    const isNrSeatsValid = this.validateNrSeats();

    if(!isMakeValid ||
      !isModelValid ||
      !isNrSeatsValid) {
        return false;
      }

      return true;
  }

  validateMake() {
    if(!this.make) {
      this.makeError = "Required";
      return false;
    }
    else {
      this.makeError = "";
      return true;
    }
  }

  validateModel() {
    if(!this.model) {
      this.modelError = "Required";
      return false;
    }
    else {
      this.modelError = "";
      return true;
    }
  }

  validateNrSeats() {
    if(!this.nrSeats) {
      this.nrSeatsError = "Required";
      return false;
    }
    else {
      this.nrSeatsError = "";
      return true;
    }
  }
}
