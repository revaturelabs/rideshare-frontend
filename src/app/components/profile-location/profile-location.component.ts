import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  profileObject : User;
  currentUser: any = '';
  wAddress: string;
  hAddress: string;
  hCity: string;
  hState: string;
  hZip: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    sessionStorage.getItem("userid")
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
      
    });
  }

  updatesLocationInfo(){

  }

}
