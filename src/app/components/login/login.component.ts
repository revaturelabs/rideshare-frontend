import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
// import { UserService } from 'src/app/services/user-service/user.service';

// import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../../services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { EmployeeServiceService } from '../../services/employee-service.service';

	// import { from } from 'rxjs';
import { Employee } from '../../models/employee';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})


/**
 * This is the login component
 */
export class LoginComponent implements OnInit {

	/**
	 * Creates an array of Users
	 * Creates an array of all Users
	 * Sets a chosen user object
	 * Sets name string variable to the chosen user
	 * Sets pagination
	 */


	chosenUserFullName: string = '';
	userName: string;
	passWord: string;
	totalPage: number = 1;
  	curPage: number = 1;

	showDropDown: boolean = false;
	failed: boolean = false;
	banned: boolean = false;

	pwdError: string;
    usernameError: string;
	userNotFound: string;
	modalRef :BsModalRef;
	/**
	 * This is a constructor
	 * @param userService An user service is instantiated.
	 * @param router A router service is injected.
	 * @param http A HTTP Client is created.
	 * @param authService An auth service is injected.
	 *
	 */
	constructor(private modalService :BsModalService,private es: EmployeeServiceService, private http: HttpClient, public r: Router) { }

	/**
	 * When the component is initialized, the system checks for the session storage to validate. Once validated, the user service is called to retrieve all users.
	 */
	ngOnInit() {
		
	}

	/**
	 * A function that indicate a fail to login
	 */

	openModal(template :TemplateRef<any>){
		this.modalRef = this.modalService.show(template);
	}

	/**
	 * A login function
	 */

	async employeelogin(){
		let username=this.userName;
		let password=this.passWord;
		let  empl:Employee = new Employee(0,"","","","",username,password,"",false,true,false,false,null);
		let e:Employee = await this.es.login(empl);
		console.log(e);
		  if(e != null){
			let key = 'User';
			sessionStorage.setItem(key,JSON.stringify(e));
			let user = JSON.parse(sessionStorage.getItem(key))
			this.modalRef.hide();
			if(e.is_manager ==true){
				
			  this.r.navigateByUrl("/profile");
			}
			else if(e.isDriver != true) {
			  this.r.navigateByUrl("/drivers");
			}
			else {
				this.r.navigateByUrl("/profile");
			}
		  }
		  else {
			console.log("c")
			alert("User or password doesnt exist!");
		  } 
	  }
	}




