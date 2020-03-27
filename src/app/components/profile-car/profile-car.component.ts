import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
/**
 *
 *
 * @export
 * @class ProfileCarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {
/**
 *
 *
 * @type {string}
 * @memberof ProfileCarComponent
 */
make: string;
  model:string;
  nrSeats:number;
  currentCar: Car;
  success :string;
/**
 *Creates an instance of ProfileCarComponent.
 * @param {CarService} carService
 * @memberof ProfileCarComponent
 */
constructor(private carService: CarService) { }
/**
 *
 *
 * @memberof ProfileCarComponent
 */
ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      this.make = response.make;
      this.model = response.model;
      this.nrSeats = response.seats;

    });
  }
/**
 *
 *
 * @memberof ProfileCarComponent
 */
updatesCarInfo(){
    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.seats = this.nrSeats;
    //console.log(this.currentUser);
    this.carService.updateCarInfo(this.currentCar);
    this.success = "Updated Successfully!";
  }

}
