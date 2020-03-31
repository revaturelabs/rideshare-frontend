import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject: User;
  carObject: Car;
  success: string;
  possibleSeats: Array<Number>;

  constructor(private userService: UserService, private carService: CarService) { }
  ngOnInit() {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
    });
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.carObject = response;
      this.possibleSeats = new Array(this.carObject.seats).fill(0).map((x,i)=>i+1);
    });
  }

  updatesMembershipInfo(){
    this.carService.updateCarInfo(this.carObject);
    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
  }
}
