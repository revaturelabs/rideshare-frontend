import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';

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

  // validation
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

    if (this.currentCar.carId) {
      // If errors are sent back, they get displayed. If no errors
      this.carService.updateCarInfo(this.currentCar).subscribe(
        res => {
          console.log(res);
          let i = 0;
          if(res.make != undefined){
            this.carMakeError = res.make[0];
            i = 1;
          }
          if(res.model != undefined){
            this.carModelError = res.model[0];
            i = 1;
          }
          if(i === 0) {
            i = 0;
            this.success = "Updated Successfully!";
            this.failed = '';
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
