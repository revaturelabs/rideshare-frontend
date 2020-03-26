import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject: User;
  currentUser: any = '';
  isDriver: boolean;
  active: boolean;
  success: string;

  result: string = "Updated Successfully!";
  resultColor: string = "";
  resultVisible: string = "hidden";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem('userid')).subscribe((response) => {
      this.profileObject = response;
      this.isDriver = this.profileObject.driver; //note: isDriver does not exist on this object
      this.active = this.profileObject.active;
    });
  }

  updatesMembershipInfo() {
    this.profileObject.driver = this.isDriver;
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject).subscribe((response)=>{

      this.result = "Updated Successfully!";
      this.resultColor="green";
      this.resultVisible="visible";
    }, error =>{

      this.result = "Error " + error.status;
      this.resultColor="red";
      this.resultVisible="visible";
    });
  }

  onActiveChange() {
    //no validation because fields are optional in database
    this.resultVisible="hidden";
  }

  onDriverChange() {
    this.resultVisible="hidden";
  }
}
