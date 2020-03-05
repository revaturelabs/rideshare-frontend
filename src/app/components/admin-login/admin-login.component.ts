import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service/auth.service';
import { AdminService } from '../../services/admin-service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admins: Admin[] = [];

  chosenAdmin: Admin;
	userName: string = '';

	failed: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllAdmins()
        .subscribe(allAdmins => {
          this.admins = allAdmins;
          this.chosenAdmin = this.admins[0];
      });
  }
  
  changeAdmin(event) {
    this.chosenAdmin = this.admins[event.target.selectedIndex];
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
					if (!this.authService.loginAsAdmin(admin, this.userName)) {
						this.loginFailed();
					}
				}
			});
	}

}
