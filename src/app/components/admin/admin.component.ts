import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 * The Admin component
 */

export class AdminComponent implements OnInit {
  /**
   * This is the constructor
   * @param router Provides an instance of a router 
   * @param adminservice Provides an instance of an admin.
   */

  constructor(private router: Router, private adminservice: UserService, private authService: AuthService) { }

/**
 * Sets users as an array of User objects
 * Sets listofUsers as an array of User objects
 */
   users: User[];
   listofUsers: User[];

   /**
    * Gives string a dom class value for a success button style when truthy
    * Gives string a dom class value for a danger button style when falsy
    */
   truthy: string = 'btn btn-success';
   falsy: string = 'btn btn-danger';
   searchText;

   /**
    * This function verifies if the user is an admin
    */
  ngOnInit() {
    let adminId = this.authService.admin.adminId;

    if(adminId){
        this.adminservice.showAllUser()
        .subscribe(
          data=> {
            this.users = data;
            this.listofUsers = data;
          }
        )
      }
      else{
        this.router.navigate(['/']);
      }
  }

  /**
   * This function searches for usernames after making the input lower case
   */
  searchUser(){
    this.users = this.listofUsers.filter(user =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  /**
   * This function changes a user status to inactive (ban user)
   * @param user 
   */
  banning(user: User) {
    user.active = !user.active;
    this.adminservice.banUser(user);
  }

}
