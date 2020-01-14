import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';

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

  getPreference() {
    this.userService.getUserById(this.user.userId).then(response => {
      if (response) {
        this.user = response;
      } else {
        sessionStorage.clear();
        this.router.navigate(['']);
      }
    })
  }

  toggleActive() {
    if (this.user.active) {
      if (window.confirm('Do you really want to deactive your account?')) {
        this.user.active = !this.user.active;
        this.user.acceptingRides = false;
        this.userService.updatePreference('active', this.user.active, this.user.userId);
      }
    } else {
      this.user.active = !this.user.active;
      this.userService.updatePreference('active', this.user.active, this.user.userId);
    }
    
  }

  toggleAcceptRider() {
    this.user.acceptingRides = !this.user.acceptingRides;
    this.userService.updatePreference('acceptingRides', this.user.acceptingRides, this.user.userId);
  }
}
