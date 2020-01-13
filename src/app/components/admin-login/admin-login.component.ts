import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admins: Admin[] = [];
	allAdmins: Admin[] = [];

  chosenAdmin: Admin;
	userName: string = '';

	totalPage: number = 1;
  curPage: number = 1;

	// showDropDown: boolean = false;
	failed: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    if (sessionStorage.getItem('auth')) {
      this.router.navigate(['home']);
    } else {
      this.adminService.getAllAdmins()
        .subscribe(allAdmins => {
          this.allAdmins = allAdmins;
          this.totalPage = Math.ceil(this.allAdmins.length / 5);
          this.admins = this.allAdmins.slice(0, 5);
          this.chosenAdmin = this.admins[0];
      });
    }
  }

  // changeUser(admin: Admin) {
	// 	this.showDropDown = false;
	// 	this.curPage = 1;
	// 	this.totalPage = Math.ceil(this.allAdmins.length / 5);
  //   this.admins = this.allAdmins.slice(this.curPage * 5 - 5, this.curPage * 5);
  //   this.chosenAdminId = admin.adminId;
  //   this.chosenAdmin = admin;
	// }

	// searchAccount() {
	// 	this.showDropDown = true;
	// 	if (this.chosenAdmin.adminId) {
	// 		this.admins = this.allAdmins.filter(admin => {
	// 			return (
	// 				admin.adminId === this.chosenAdmin.adminId
	// 			);
	// 		});
	// 		this.totalPage = Math.ceil(this.admins.length / 5);
	// 	} else {
	// 		this.curPage = 1;
	// 		this.totalPage = Math.ceil(this.allAdmins.length / 5);
	// 		this.admins = this.allAdmins.slice(this.curPage * 5 - 5, this.curPage * 5);
	// 	}
  // }
  
  changeAdmin(event) {
    this.chosenAdmin = this.allAdmins[event.target.selectedIndex];
  }

	// toggleDropDown() {
	// 	this.showDropDown = !this.showDropDown;
	// }

	nextPage() {
		this.curPage++;
		this.admins = this.allAdmins.slice(this.curPage * 5 - 5, this.curPage * 5);
	}

	prevPage() {
		this.curPage--;
		this.admins = this.allAdmins.slice(this.curPage * 5 - 5, this.curPage * 5);
	}
	

	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	login() {
		this.http.get<Admin>(`${environment.adminUri}${this.chosenAdmin.adminId}`)
			.subscribe((admin: Admin) => {
				if (!admin.adminId) {
					this.loginFailed();
				} else {
					if (!this.authService.LoginAsAdmin(admin, this.userName)) {
						this.loginFailed();
					}
				}
			});
	}

}
