import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject : User = new User();
  currentUser: any = '';
  isDriver: boolean;
  active: boolean;
  success: string;
  constructor(private router: Router, private userService: UserService) { }
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
