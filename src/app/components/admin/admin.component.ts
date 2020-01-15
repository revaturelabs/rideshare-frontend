import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';

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
   * @constructor
   * @param router Provides an instance of a router
   */
  constructor(private router: Router, private adminservice: UserService) { }

   users: User[];
   listofUsers: User[];

   truthy: string = 'btn btn-success';
   falsy: string = 'btn btn-danger';
   searchText;
  ngOnInit() {

    this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.users = data;
        this.listofUsers = data;
      }
    )
  }

  searchUser(){
    this.users = this.listofUsers.filter(user =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  banning(user: User) {
    user.active = !user.active;
    this.adminservice.banUser(user);
  }

}
