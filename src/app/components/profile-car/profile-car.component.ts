import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormControl } from '@angular/forms';
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
  profileForm;


  constructor(private carService: CarService) { }

  ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileForm = new FormGroup({
        make: new FormControl(response.make),
        model: new FormControl(response.model),
        nrSeats: new FormControl(response.seats)
      });
      this.currentCar = response;
    });


  }

  updatesCarInfo(){
    this.currentCar.make = this.profileForm.value.make;
    this.currentCar.model= this.profileForm.value.model;
    this.currentCar.seats = this.profileForm.value.nrSeats;
    console.log(this.currentCar);
   this.carService.updateCarInfo(this.currentCar).then(res=>{
     this.success = "Updated Successfully!";
   }).catch(error=>{
     this.success = "Error occurred, Update was unsucessful"
   })
    
  }

}
