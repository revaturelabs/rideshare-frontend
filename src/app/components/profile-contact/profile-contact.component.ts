import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  profileObject : User;
  currentUser: any = '';


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  sessionStorage.getItem("userid")
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;

    });
 
console.log(this.profileObject);
    


  }

}
