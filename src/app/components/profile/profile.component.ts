import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  batch: Batch = new Batch();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user.userId = Number(sessionStorage.getItem('auth'));
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.user.batch = this.batch;
      this.userService.getUserById(this.user.userId).then(response => {
        if (response) {
          this.user = response;
        } else {
          sessionStorage.clear();
          this.router.navigate(['']);
        }
      })
    }
  }

  updateProfile() {
    console.log(this.user);
  }
}
