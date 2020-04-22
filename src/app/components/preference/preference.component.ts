import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';



/***
  THIS IS A NAVBAR COMPONENT.
 ***/



@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})

export class PreferenceComponent implements OnInit {



  user: User = new User();
  truthy: string = 'btn btn-success';
  falsy: string = 'btn btn-danger';

  
  
  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }



  ngOnInit() {
    this.user.userId = this.authService.user.userId;;
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.getPreference();
    }
  }



  //This function fetches an user from the database.
  getPreference() {
    this.userService.getUserById(this.user.userId).then(response => {
      if (response) {
        this.user = response;
      } else {
        this.authService.user = {};
        this.router.navigate(['']);
      }
    })
  }

  //This function changes the account from activate to inactive.
  toggleActive() {
    if (this.user.active) {
      let text = prompt("Your Account Will Be Banned. Type 'Confirm' To Continued");
      if (text === 'Confirm') {
        this.user.active = !this.user.active;
        this.user.isAcceptingRides = false;
        this.userService.updatePreference('active', this.user.active, this.user.userId);
      }
    } else {
      this.user.active = !this.user.active;
      this.userService.updatePreference('active', this.user.active, this.user.userId);
    }
    
  }

  //This function changes the driver account from accepting rides to not accepting rides.
  toggleAcceptRider() {
    this.user.isAcceptingRides = !this.user.isAcceptingRides;
    this.userService.updatePreference('acceptingRides', this.user.isAcceptingRides, this.user.userId);
  }

}