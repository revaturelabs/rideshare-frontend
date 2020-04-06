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

  make: string;
  model:string;
  nrSeats:number;
  currentCar: Car;
  success :string;
  emptyMake: string;
  emptyModel: string;
  failed: String;

  // validation
  carMakeError: string;
  carModelError: string;

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

    this.carMakeError = '';
    this.carModelError = '';
    this.failed='Update failed. Please resolve above error(s).';
    this.success='';

    // If errors are sent back, they get displayed. If no errors
    this.carService.updateCarInfo(this.currentCar).subscribe(
      resp => {
        this.success = "Updated Successfully!";
        this.failed = '';
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400){
          let errors = err.error;
          if (errors.make) this.carMakeError = errors.make[0];
          if (errors.model) this.carModelError = errors.model[0];
        } else {
          console.error(err);
        }
      }

    );

  }

}

// //console.log(this.currentUser);
// switch(this.currentCar.make){
//   case '': this.emptyMake = "Make field required.";
//           this.failed = "CANNOT UPDATE CAR INFORMATION!";
//           this.success = "";
//           break;
//   default: this.emptyMake = "";
// }
// switch(this.currentCar.model){
//   case '': this.emptyModel = "Model field required.";
//           this.failed = "CANNOT UPDATE CAR INFORMATION!";
//           this.success = "";
//           break;
//   default: this.emptyModel = "";
// }
