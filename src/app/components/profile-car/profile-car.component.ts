import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  currentCar: Car;
  success :string;
  errorMessage:string;
  carForm  = new FormGroup({
    make: new FormControl("", Validators.required),
    model: new FormControl("", Validators.required),
    nrSeats: new FormControl("", Validators.required )
  });


  constructor(private carService: CarService) { }

  ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.carForm = new FormGroup({
        make: new FormControl(response.make, Validators.required),
        model: new FormControl(response.model),
        nrSeats: new FormControl(response.seats)
      });
      this.currentCar = response;
    });


  }

  //this method gets called when form is submitted, it validates the input before making an update request to the endpoint
  updatesCarInfo(){
    this.success ="";
    this.errorMessage ="";
    this.currentCar.make = this.carForm.value.make;
    this.currentCar.model= this.carForm.value.model;
    this.currentCar.seats = this.carForm.value.nrSeats;
    //console.log(this.carForm.value.nrSeats.length >1);

    if(this.validInput.make.valid && this.validInput.model.valid && !(this.carForm.value.nrSeats.length >1)){
         this.carService.updateCarInfo(this.currentCar).then(res=>{
         this.success = "Updated Successfully!";
         }).catch(error=>{
          this.errorMessage = "Error occurred, Update was unsucessful"
          })
    } else{
      this.errorMessage ="Invalid Inputs";
    }
  }

  //this method gets called in the html template to verify input validations.
  get validInput(){
    return this.carForm.controls;
  }

}
