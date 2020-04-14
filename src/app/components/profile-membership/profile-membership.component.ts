import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  user : User = new User();
  success: string;
  //using @input to get batch data from profile component, the parent component
  @Input() batchNumber: any;
  @Input() batchLocation: any;
  @Input() driverSelect: boolean;
  @Input() isActive:boolean;
  @Input() userId:number ;
  @Output() onDriverStatus = new EventEmitter();
  isDriver:boolean;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.user = response;
      this.driverSelect = response.driver;
      this.isActive = response.active;
    })
  }
  updatesMembershipInfo(){
    this.userService.updateUserInfo2(this.user).then(res=>{
      //this requests updates the most recent driver status after an update is submitted
      this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
        this.isDriver =response.driver;
        this.onDriverStatus.emit(this.isDriver)
      })
      this.success = "Update Successful"
      
    }).catch(error=>{
      this.success = "Error Occurred, Update was cancelled"
    })

  }

//this method binds the select option values
  onSelectDriver(ev){
    //console.log(ev.target.value)
    if(ev.target.value == "true"){
      this.user.driver = true;
    }
    if(ev.target.value == "false"){
      this.user.driver = false;
    }
    
  }

  onSelectActive(ev){
    //console.log(ev.target.value)
    if(ev.target.value == "true"){
      this.user.active = true;
    }
    if(ev.target.value == "false"){
      this.user.active = false;
    }
  }
}
