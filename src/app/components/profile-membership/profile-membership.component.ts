import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject : User;
  currentUser: any = '';
  isDriver: boolean;
  active: boolean;
  success: string;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
    });
  }
  updatesMembershipInfo(){
    this.profileObject.isDriver = this.isDriver;
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
  }
}
