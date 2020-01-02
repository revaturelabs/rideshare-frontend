import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ListUsers } from 'src/app/models/ListUsers';

@Component({
  selector: 'app-adminban',
  templateUrl: './adminban.component.html',
  styleUrls: ['./adminban.component.css']
})
export class AdminbanComponent implements OnInit {

  private listofUsers: ListUsers[];

  private displayMessageUpdate: string;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
    this.adminservice.showAllUser()
    .subscribe(
      data=> {
        this.listofUsers = data;
      }
    )
  }

  banningUser(userid: number, userName: string, firstName: string, lastName: string, email: string, phoneNumber:string, batch: object, active: boolean){
    if(active == true){
      active = false;
      this.adminservice.banUser(userid, userName, firstName, lastName, email, phoneNumber, batch, active);
      this.displayMessageUpdate = "User has been banned!";
      window.location.reload();
    }
    else {
      active = true;
      this.adminservice.banUser(userid, userName, firstName, lastName, email, phoneNumber, batch, active);
      this.displayMessageUpdate = "User has been unbanned!";
      window.location.reload();
    }
  }
}
