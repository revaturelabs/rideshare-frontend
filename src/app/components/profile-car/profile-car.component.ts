import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
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
  errorMessage:string;
  profileForm  = new FormGroup({
    make: new FormControl("", Validators.required),
    model: new FormControl("", Validators.required),
    nrSeats: new FormControl("", Validators.required )
  });

  userHasCar = true;


  constructor(private carService: CarService, private userService: UserService) { }

  ngOnInit() {

    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
        console.log(response)
    })


    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      
      if(response != null){
        this.profileForm = new FormGroup({
          make: new FormControl(response.make, Validators.required),
          model: new FormControl(response.model),
          nrSeats: new FormControl(response.seats)
        });

        this.userHasCar=true;
      }
      else{
        this.success ="No car information is found"
        this.userHasCar = false;
      }   
      this.currentCar = response;
    }, error=>{

    });
  }

  updatesCarInfo(){

    console.log(this.validInput)
    this.success ="";
    this.currentCar.make = this.profileForm.value.make;
    this.currentCar.model= this.profileForm.value.model;
    this.currentCar.seats = this.profileForm.value.nrSeats;
    //console.log(this.profileForm.value.nrSeats.length >1);
   // console.log(this.validInput.make.valid)

    if(this.validInput.make.valid && this.validInput.model.valid && !(this.profileForm.value.nrSeats.length >1)){
         this.carService.updateCarInfo(this.currentCar).then(res=>{
         this.success = "Updated Successfully!";
         }).catch(error=>{
          this.success = "Error occurred, Update was unsucessful"
          })
    } else{
      this.success ="Invalid Inputs";
    }

    
  }

  get validInput(){
    return this.profileForm.controls;
  }

}
