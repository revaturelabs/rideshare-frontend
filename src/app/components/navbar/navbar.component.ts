import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from 'src/app/services/user-service/user.service';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { User } from 'src/app/models/user';
// import { Admin } from 'src/app/models/admin';
import {SignupModalComponent} from '../sign-up-modal/sign-up-modal.component';
import { EmployeeServiceService } from '../../services/employee-service.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

  /**
   * The Navbar component
   */

export class NavbarComponent implements OnInit {
  modal :SignupModalComponent;
  /**
   * This is a name string.
   */

  name: string = '';
  admin: string = '';

  currentUser: string = '';
  currentEmployee: string = '';
  employee: Employee;
  /**
   * This is a constructor
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param authService A dependency of an auth service is injected.
   */

  constructor(private router: Router, public employeeService : EmployeeServiceService) { }

  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid and send the token to the user service.
   * An auth service is invoked and the Navbar will listen to the logged in event.
   * The navbar will change after user login or sign up
   */

  ngOnInit() {
    this.employee = JSON.parse(sessionStorage.getItem("User"));

    if(this.employee != null){
      this.currentEmployee = this.employee.first_name + " " + this.employee.last_name;

    }else{
      this.currentEmployee = '';
    }
    // if (this.employee.employee_id != null) {
    //   this.employeeService.getEmployeeById(this.employee.employee_id).then((response)=>{
    //     this.name = response.first_name;
    //   })
    }

    // this.authService.getEmitter().subscribe((user: any) => {
    //   if (user.userId) {
    //     this.name = user.firstName;
    //   } else if (user.adminId) {
    //     this.admin = user.userName;
    //   }
    //});

    // this.employeeService.getEmitter().subscribe((emplo: Employee) => {
    //   this.name = emplo.first_name;
    // });
  //}

   /**
   * Function that takes no parameters. 
   * It will clear the sesssion storage.
   * @return {void} 
   * 
   */

   
  logout() {
    // this.authService.user = {};
    // this.authService.admin = new Admin();
    //clear all session
    sessionStorage.removeItem("User");
    this.name = '';
    this.admin = '';
    // this.currentUser = '';
    this.currentEmployee = '';
    // sessionStorage.removeItem("name");
    
    console.log(this.currentEmployee);
    //sessionStorage.clear(); 
    this.router.navigateByUrl("/home");
  }

  // redirectToHome() {
  //   this.authService.user.driver ? this.router.navigate(['home/riders']) : this.router.navigate(['home/drivers']);
  // }


}