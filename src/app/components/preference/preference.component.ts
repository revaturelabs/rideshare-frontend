import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  user: User = new User();

  truthy: string = 'btn btn-success';
  falsy: string = 'btn btn-danger';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user.userId = Number(sessionStorage.getItem('auth'));
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
    this.user.active = !this.user.active;
    if (!this.user.active) {
      this.user.acceptingRides = false;
    }
    this.userService.updatePreference('active', this.user.active, this.user.userId);
  }

  toggleAcceptRider() {
    this.user.acceptingRides = !this.user.acceptingRides;
    this.userService.updatePreference('acceptingRides', this.user.acceptingRides, this.user.userId);
  }
}
