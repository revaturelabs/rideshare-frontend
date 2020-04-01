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
  batchNumber: string = "Not Set";
  batchLocation: string = "";

  result: string = "Updated Successfully!";
  resultColor: string = "";
  resultVisible: string = "hidden";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem('userid')).subscribe((response) => {
      this.profileObject = response;

      if(this.profileObject.batch != null) {
        this.batchLocation = this.profileObject.batch.batchLocation;
        this.batchNumber =  this.profileObject.batch.batchNumber.toString();
      }
    });
  }

  updatesMembershipInfo() {
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
}
