import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

/**
 * The AdminLogin component
 */

export class AdminLoginComponent implements OnInit {


  /**
   * Set admins as an array of Admin
   * Set userId
   * Instantiates a boolean
   */

  admins: Admin[] = [];

  chosenAdmin: Admin;
	userName: string = '';

  failed: boolean = false;

  /**
   * This is the constructor
   * @param authService Provides an instance of a AuthService .
   * @param http Provides an instance of a HttpCLient.
   * @param adminService Provides an instance of AdmiService.
   */


  constructor(private http: HttpClient, private authService: AuthService, private adminService: AdminService) { }

   /**
   * This is an OnInit function that sets the user id as the parsed string in session storage.
   * The system will check if the user id is valid.
   * Once validated, it will initialize the fields.
   */

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

   /**
  * This is method failure to login.
  * @param userName
  * @returns {true}
  */

	loginFailed() {
		this.userName = '';
		this.failed = true;
  }

   /**
  * This is method successful to login.
  * @param userName
  * @returns {true}
  */

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
