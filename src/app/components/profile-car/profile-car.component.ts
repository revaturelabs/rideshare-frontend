import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  make: string = "";
  model: string = "";
  nrSeats: number;
  currentCar: Car;
  success: string = "";

  makeError: string = "";
  modelError: string = "";
  nrSeatsError: string = "";

  constructor(private carService: CarService) { }

  ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      if(response) {
        this.make = response.make;
        this.model = response.model;
        this.nrSeats = response.seats;
      }
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

  //if car make field changes
  onMakeChange() {
    this.validateMake(); //validate again
  }

  onModelChange() {
    this.validateModel();
  }

  onNrSeatsChange() {
    this.validateNrSeats();
  }

  //validate entire form
  validateForm() {

    const isMakeValid = this.validateMake();
    const isModelValid = this.validateModel();
    const isNrSeatsValid = this.validateNrSeats();

    //if invalid, return false
    if(!isMakeValid ||
      !isModelValid ||
      !isNrSeatsValid) {
        return false;
      }

      return true;
  }

  //validate make
  validateMake() {
    this.make = this.make.trim();
    if(!this.make) { //if empty
      this.makeError = "Required"; //required
      return false;
    }
    else {
      this.makeError = ""; //hide error
      return true;
    }
  }

  //validate model
  validateModel() {
    this.model = this.model.trim();
    if(!this.model) {
      this.modelError = "Required";
      return false;
    }
    else {
      this.modelError = "";
      return true;
    }
  }

  //validate # of seats
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
