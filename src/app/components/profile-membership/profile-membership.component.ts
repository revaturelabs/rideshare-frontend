import { Component, OnInit , Input} from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject : User = new User();
  currentUser: any = '';
  isDriver: any;
  active: any;
  success: string;

  //using @input to get batch data from profile component, the parent component
  @Input() batchNumber: any;
  @Input() batchLocation: any;
  
  constructor(private userService: UserService) { }
  ngOnInit() {
    //console.log(this.batchNumber + " " + this.batchLocation)
  }
  updatesMembershipInfo(){
    this.profileObject.driver = this.isDriver;
    console.log(this.isDriver);
    
    // this.profileObject.active = this.active;
    // this.userService.updateUserInfo(this.currentUser, this.profileObject);
    // this.success = "Updated Successfully!";
  }
}
