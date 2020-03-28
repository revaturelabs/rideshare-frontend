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
  active: boolean = false;
  success: string;
  batchNumber: string = "";
  batchLocation: string = "";

  result: string = "Updated Successfully!";
  resultColor: string = "";
  resultVisible: string = "hidden";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem('userid')).subscribe((response) => {
      this.profileObject = response;
      this.active = this.profileObject.active;

      if(this.profileObject.batch != null) {
        this.batchLocation = this.profileObject.batch.batchLocation;
        this.batchNumber =  this.profileObject.batch.batchNumber.toString();
      }
    });
  }

  updatesMembershipInfo() {
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject).subscribe((response)=>{

      this.result = "Updated Successfully!";
      this.resultColor="green";
      this.resultVisible="visible";
    }, error =>{

      //likely server error
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
