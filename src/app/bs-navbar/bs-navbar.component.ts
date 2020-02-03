import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  /**
   * This is a name string.
   */

  name: string = '';
  admin: string = '';

  /**
   * This is a constructor
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param authService A dependency of an auth service is injected.
   */

  constructor(private router: Router, private userService: UserService, public authService: AuthService) { }

  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid and send the token to the user service.
   * An auth service is invoked and the Navbar will listen to the logged in event.
   * The navbar will change after user login or sign up
   */

  ngOnInit() {
    if (this.authService.user.userId) {
      this.userService.getUserById(this.authService.user.userId).then((response)=>{
        this.name = response.firstName;
      })
    }

    this.authService.getEmitter().subscribe((user: any) => {
      if (user.userId) {
        this.name = user.firstName;
      } else if (user.adminId) {
        this.admin = user.userName;
      }
    });

    this.userService.getEmitter().subscribe((user: User) => {
      this.name = user.firstName;
    });
  }

   /**
   * Function that takes no parameters. 
   * It will clear the sesssion storage.
   * @return {void} 
   * 
   */

   
  logout() {
    this.authService.user = {};
    this.name = '';
    this.admin = '';
    this.router.navigate(['']);
  }

  redirectToHome() {
    this.authService.user.driver ? this.router.navigate(['home/riders']) : this.router.navigate(['home/drivers']);
  }
}
