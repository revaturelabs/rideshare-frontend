import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

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
        address2: new FormControl(response.wAddress, Validators.required),
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




  get validInput(){
    return this.profileLocation.controls;
  }

  updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUserId, this.currentUser);
    this.success = "Updated Successfully!";
  }
}
