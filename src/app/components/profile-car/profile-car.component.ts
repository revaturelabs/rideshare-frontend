import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  year: number;
  make: string;
  model: string;
  nrSeats: number;
  currentCar: Car;
  success: string;
  emptyMake: string;
  emptyModel: string;
  failed: String;

  // validation errors that will be displayed
  carYearError: string;
  carMakeError: string;
  carModelError: string;

  constructor(private carService: CarService) { }

  ngOnInit() {
    // Get the logged in user's car information or set default values if null
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      if (response) {
        this.currentCar = response;
        this.make = response.make;
        this.model = response.model;
        this.nrSeats = response.seats;
        this.year = response.year;
      } else {
        this.currentCar = new Car();
        this.make = '';
        this.model = '';
        this.nrSeats = 0;
        this.year = null;
      }
    });
  }

  updatesCarInfo(){
    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.seats = this.nrSeats;
    this.currentCar.year = this.year;

    this.carYearError = '';
    this.carMakeError = '';
    this.carModelError = '';
    this.failed='Update failed. Please resolve above error(s).';
    this.success='';

    // checking if year entered is a 4 digit number. If it is, send car info to the back end. 
    var fourdigits = new RegExp(/\d{4}$/);
    if(!fourdigits.test(String(this.year))) {
      this.carYearError = "Year field must be a 4 digit number."
    }
    else{
      if (this.currentCar.carId) {
        // If errors are sent back, they get displayed. If no errors
        this.carService.updateCarInfo(this.currentCar).subscribe(
          resp => {
            this.success = "Updated Successfully!";
            this.failed = '';
          },
          (err: HttpErrorResponse) => {
            if (err.status == 400){
              let errors = err.error;
              if (errors.make) this.carMakeError = errors.make[0];
              if (errors.model) this.carModelError = errors.model[0];
            } else {
              console.error(err);
            }
          }
        );
      } else {
        // CurrentCar is not in the database so create a new one
        this.carService.createCar(this.currentCar, sessionStorage.getItem('userid')).subscribe(
          res => {
            this.success = "Added Successfully!";
            this.failed = '';
            this.currentCar = res;
          }
        )
      }
    }  

  }
}
