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

   listofUsers: User[];
   allListofUsers: User[];

   truthy: string = 'btn btn-success';
   falsy: string = 'btn btn-danger';
   searchText;
  ngOnInit() {

    this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.listofUsers = data;
        this.allListofUsers = data;
      }
    )
}
  /**
   * Function that takes no parameters.
   * It will clear the sesssion storage.
   * @return {void}
   *
   */
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  searchUser(){
    this.listofUsers = this.allListofUsers.filter(item => item.userName.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  banning(user: User) {
    user.active = !user.active;
    this.adminservice.banUser(user);
  }

}
