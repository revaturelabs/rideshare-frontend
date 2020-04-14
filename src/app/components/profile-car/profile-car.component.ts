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

  carInfo: FormGroup;
  make: string;
  model:string;
  color:string;
  year:number;
  nrSeats:number;
  currentCar: Car;
  success :string;
  errorMessage:string;
  profileForm  = new FormGroup({
    make: new FormControl("", Validators.required),
    model: new FormControl("", Validators.required),
    color: new FormControl("", Validators.required),
    year: new FormControl("",[ Validators.required, Validators.maxLength(4)]),
    nrSeats: new FormControl("", Validators.required )
  });

  userHasCar: boolean = true;


  constructor(private carService: CarService, private userService: UserService) { }

  ngOnInit() {

    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
       // console.log(response)
    })


    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      
      if(response != null){
        this.profileForm = new FormGroup({
          make: new FormControl(response.make, Validators.required),
          model: new FormControl(response.model),
          color: new FormControl(response.color),
          year: new FormControl(response.year),
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
    console.log(this.validInput.year.value.toString().length)
    this.success ="";
    this.currentCar.make = this.profileForm.value.make;
    this.currentCar.model= this.profileForm.value.model;
    this.currentCar.color = this.profileForm.value.color;
    this.currentCar.year = this.profileForm.value.year;
    this.currentCar.seats = this.profileForm.value.nrSeats;

    if(this.validInput.color.valid && this.validInput.year.valid && this.validInput.make.valid && this.validInput.model.valid && !(this.profileForm.value.nrSeats.length >1) && this.validInput.year.value.toString().length ==4){

      console.log("current car: "+this.currentCar.carId)
      if(this.userHasCar){
        //update car info here
         this.carService.updateCarInfo1(this.currentCar).then(res=>{
         this.success = "Updated Successfully!";
         }).catch(error=>{
          this.success = "Error occurred, Update was unsucessful"
          })
      }else{
        //create a car here
      }
   
    } else{
      console.log("check invalid")
      this.success ="Invalid Inputs";
    }

    
  }

  get validInput(){
    return this.profileForm.controls;
  
  }

  

}
