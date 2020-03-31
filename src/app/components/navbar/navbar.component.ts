import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { Admin } from 'src/app/models/admin';
import {SignupModalComponent} from '../sign-up-modal/sign-up-modal.component';
import { SessionService } from 'src/app/services/session-service/session.service';
import { EventEmitter } from '@angular/core';

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

  name: string = '';
  admin: string = '';

  currentUser: string = '';
  sessionEmitter: EventEmitter<Storage>;

  /**
   * This is a constructor
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param authService A dependency of an auth service is injected.
   */

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private sessionService: SessionService) { }

  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid and send the token to the user service.
   * An auth service is invoked and the Navbar will listen to the logged in event.
   * The navbar will change after user login or sign up
   */

  ngOnInit() {
    this.sessionEmitter = this.sessionService.getEmitter();
    if (this.sessionEmitter) {
      this.sessionEmitter.subscribe((session: Storage) => {
        if (session) {
          this.getUserInfo();
        } else {
          this.currentUser = '';
        }
      });
    }
  }

  getUserInfo() {
    

    if(sessionStorage.getItem("userid") != null){
      this.currentUser = sessionStorage.getItem("name");
    }else{
      this.currentUser ='';
    }
    
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
    this.authService.admin = new Admin();
    //clear all session
    this.name = '';
    this.admin = '';
    this.currentUser = '';
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userid");
    this.router.navigate(['']);
  }

  /**
   * Function that redirects to home component
   */
  redirectToHome() {
    this.authService.user.driver ? this.router.navigate(['home/riders']) : this.router.navigate(['home/drivers']);
  }
}