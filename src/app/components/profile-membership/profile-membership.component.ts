import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject: any; //note: changing this from 'User' to 'any' because the object returned by getUserById2() has different class members than User. ie: User has "isDriver" but the obj returned has "driver". this causes errors and the component to not work correctly
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
      this.isDriver = this.profileObject.driver;
      this.active = this.profileObject.active;
    });
  }

  updatesMembershipInfo() {
    this.profileObject.driver = this.isDriver;
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject).then(function(response){

      this.result = "Updated Successfully!";
      this.resultColor="green";
      this.resultVisible="visible";
    }).catch(function(e){

      //likely server error
      this.result = "Error " + e.status;
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
