import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { User } from 'src/app/models/user';

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
  constructor(private router: Router, private adminservice: AdminService) { }



   listofUsers: User[];

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

  banningUser(userid: number, userName: string, firstName: string, lastName: string, email: string, phoneNumber:string, batch: object, active: boolean){
    this.refreshData();
    if(active === true){
      active = false;
      this.adminservice.banUser(userid, userName, firstName, lastName, email, phoneNumber, batch, active);
    }
    else {
      active = true;
      this.adminservice.banUser(userid, userName, firstName, lastName, email, phoneNumber, batch, active);
    }
    this.refreshData();
  }

  private refreshData(){
    this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.listofUsers = data;
      }
    )
  }

}
