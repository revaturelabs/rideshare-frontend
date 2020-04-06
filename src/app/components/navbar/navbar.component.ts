import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { Admin } from 'src/app/models/admin';
import {SignupModalComponent} from '../sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

  /**
   * The Navbar component
   */

export class NavbarComponent implements OnInit {
  modal :SignupModalComponent;
  /**
   * This is a name string.
   */
  profileObject : User;
  name: string = '';
  admin: string = '';
  firstName: string;
  lastName: string;
  currentUser: boolean;

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
    this.userService.getLoggedInUser().subscribe(
      (resp: User) => {
        if (resp) {
          this.profileObject = resp;
          this.firstName = resp.firstName;
          this.lastName = resp.lastName;
          this.currentUser = true;
        }
      }
    );

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

  }

   /**
   * Function that takes no parameters. 
   * It will clear the session storage.
   * @return {void} 
   * 
   */

   
  logout() {
    this.authService.user = {};
    this.authService.admin = new Admin();
    //clear all session
    this.name = '';
    this.admin = '';
    this.currentUser = false;
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userid");
    //sessionStorage.clear(); 
    this.router.navigate(['']);
  }

  redirectToHome() {
    this.authService.user.driver ? this.router.navigate(['home/riders']) : this.router.navigate(['home/drivers']);
  }
}