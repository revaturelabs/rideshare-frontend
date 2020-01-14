import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

  /**
   * The Navbar component
   */

export class NavbarComponent implements OnInit {

  token: number;
  name: string = '';

  /**
   * @constructor 
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param authService A dependency of an auth service is injected.
   */

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid and send the token to the user service.
   * An auth service is invoked and the Navbar will listen to the logged in event.
   * The navbar will change after user login or sign up
   */

  ngOnInit() {
    this.token = Number(sessionStorage.getItem('auth'));
    if (this.token) {
      this.userService.getUserById(this.token).then((response)=>{
        this.name = response.firstName;
      })
    }

    this.authService.getEmitter().subscribe((user: User) => {
      this.token = user.userId;
      this.name = user.firstName;
    });

    this.userService.getEmitter().subscribe((user: User) => {
      this.token = user.userId;
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
    sessionStorage.clear();
    this.token = null;
    this.name = '';
    this.router.navigate(['']);
  }

  
}
