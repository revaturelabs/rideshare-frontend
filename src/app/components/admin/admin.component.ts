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
   searchListofUsers: User[];
   isBanned: boolean = false

   truthy: string = 'btn btn-success';
   falsy: string = 'btn btn-danger';
   searchText;
  ngOnInit() {

    this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.listofUsers = data;
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
    this.searchListofUsers = this.listofUsers.filter(item => item.userName.toLowerCase().includes(this.searchText.toLowerCase()));
    this.listofUsers = this.searchListofUsers;
  }

  banning(obj: User, userid: number, userName: string, firstName: string, lastName: string, email: string, phoneNumber:string, batch: object, active: boolean) {
    console.log(obj);
    obj.active = !obj.active;
    active = !active;
    this.adminservice.banUser(userid, userName, firstName, lastName, email, phoneNumber, batch, active);
  }

}
