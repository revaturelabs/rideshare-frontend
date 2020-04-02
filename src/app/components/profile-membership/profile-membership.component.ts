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
  driver: string;
  active: string;
  success: string;
  
  
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
      this.driver = String(JSON.stringify(this.profileObject.driver));
      this.active = String(JSON.stringify(this.profileObject.active));
    });
  }
  updatesMembershipInfo(){
    this.profileObject.driver = Boolean(JSON.parse(this.driver));
    this.profileObject.active = Boolean(JSON.parse(this.active));
    this.userService.updateUserInfo(this.profileObject).subscribe(
      res => {
        console.log(res);
      } 
    );;
    this.success = "Updated Successfully!";
    console.log("success driver: "+this.driver+" active: "+this.active);
  }
}
