import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

/**
 * This is the login component
 */
export class LoginComponent implements OnInit {

	users: User[] = [];
	chosenUser: User;
	userName: string = '';

	failed: boolean = false;

	/**
	 * @constructor
	 * @param userService An user service is instantiated.
	 * @param router A router service is injected.
	 * @param http A HTTP Client is created.
	 * @param authService An auth service is injected.
	 * 
	 */
	constructor(private userService: UserService, private router: Router, private http: HttpClient, private authService: AuthService) { }

	/**
	 * When the component is initialized, the system checks for the session storage to validate. Once validated, the user service is called to retrieve all users.
	 */
	ngOnInit() {
		if (sessionStorage.getItem('auth')) {
				this.router.navigate(['home']);
		} else {
			this.userService.getAllUsers()
				.subscribe(allUsers => {
					this.users = allUsers;
					this.chosenUser = this.users[0];
			});
		}
	}

	changeUser(event) {
		this.chosenUser = this.users[event.target.selectedIndex];
	}

	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	login() {
		this.http.get<User[]>(`${environment.userUri}?username=${this.userName}`)
			.subscribe((user: User[]) => {
				if (!user.length) {
					this.loginFailed();
				} else {
					if (!this.authService.login(user[0], this.chosenUser.userName)) {
						this.loginFailed();
					}
				}
			});
	}

}
