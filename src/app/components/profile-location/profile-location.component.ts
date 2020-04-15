import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
// updated 4-14 - ryan
@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  profileObject : User = new User();
  zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;
  driver: boolean;
  currentUserId: any;

   profileLocation = new FormGroup({
    address: new FormControl("", Validators.required),
    address2: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required ),
    zipcode: new FormControl("", Validators.required ),
    hState: new FormControl("", Validators.required )
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
     
    if(response != null){
      this.profileLocation = new FormGroup({
        address: new FormControl(response.hAddress, Validators.required),
        address2: new FormControl(response.batch.bAddress, Validators.required),
        city: new FormControl(response.hCity, Validators.required),
        zipcode: new FormControl(response.hZip, Validators.required),
        hState: new FormControl(response.hState, Validators.required)
      });
    }
    else{
      this.success ="No location information is found"
    }
    
    
        
    this.currentUser = response;
      // this.zipcode = response.hZip;
      // this.city = response.hCity;
      // this.address = response.hAddress;
      // this.address2 = response.wAddress;
      // this.hState = response.hState;

    }, error=>{

    });

  }


  getGooglePlace(place){
    console.log(place)
    console.log("STREET NUMBER: " + place.address_components[0].long_name);
    
  }


  get validInput(){
    return this.profileLocation.controls;
  }

  updatesLocationInfo(){


    this.profileObject = this.currentUser;

    this.currentUser.hZip = this.profileLocation.value.zipcode;
    this.currentUser.hCity = this.profileLocation.value.city;
    this.currentUser.hAddress = this.profileLocation.value.address;
    this.currentUser.wAddress = this.profileLocation.value.address2;
    this.currentUser.hState = this.profileLocation.value.hState;
    //console.log(this.currentUser);

    console.log(this.profileObject);

    console.log("hAddress " + this.validInput.address.valid)
    console.log("wAddress " +this.validInput.address2.valid)
    console.log("hCity " +this.validInput.city.valid)
    console.log("hState " +this.validInput.hState.valid)
    console.log("hZip " +this.validInput.zipcode.valid)

    if(this.validInput.address.valid && this.validInput.address2.valid && this.validInput.city.valid && this.validInput.hState.valid  && this.validInput.zipcode.valid)
    {
        //update user info here
        this.userService.updateUserInfo1(this.profileObject).then(res=>{
         this.success = "Updated Successfully!";
         }).catch(error=>{
          this.success = "Error occurred, Update was unsucessful"
          })
        
    } else{
      console.log("check invalid")
      this.success ="Invalid Inputs";
    }   
  }
}
