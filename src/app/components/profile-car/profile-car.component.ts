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
