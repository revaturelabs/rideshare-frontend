import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  profileObject : User;
  currentUser: any = '';
  currentEmployee: Employee;
  currentId: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success :string;
  constructor(private router: Router, private userService: UserService, private employeeService: EmployeeServiceService) { }

  ngOnInit() {
   
    this.currentEmployee = JSON.parse(sessionStorage.getItem("User"));
    // this.currentId = this.employeeService.getEmployeeById(this.currentEmployee.employee_id);
    this.firstName = this.currentEmployee.first_name;
    this.lastName = this.currentEmployee.last_name;
    this.email = this.currentEmployee.email;
    this.phone = this.currentEmployee.phone_number;
    // this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
    // this.profileObject = response;
    // this.firstName = this.profileObject.firstName;
    // this.lastName = this.profileObject.lastName;
    // this.email = this.profileObject.email;
    // this.phone = this.profileObject.phoneNumber;

    // });
    
  }

  updatesContactInfo(){
    this.currentEmployee.first_name = this.firstName;
    this.currentEmployee.last_name = this.lastName;
    this.currentEmployee.email = this.email;
    this.currentEmployee.phone_number = this.phone;

    this.employeeService.updateEmployee(this.currentEmployee);
    this.success = "Updated Successfully!";
  }


}
