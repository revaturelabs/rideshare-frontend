import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../../services/employee-service.service';
import { ConfigServiceService } from '../../services/config-service.service';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  employee: Employee;
  f_name : string;
  l_name : string;
  username : string;
  password : string;
  email : string;
  phone : string;
  address : string;
  isDriver : boolean;
  isActive : boolean;

  constructor(private employeeService: EmployeeServiceService, private configService:ConfigServiceService) { }

  ngOnInit() {
    this.employee = JSON.parse(sessionStorage.getItem('User'));
    this.f_name = this.employee.first_name;
    this.l_name = this.employee.last_name;
    this.username = this.employee.username;
    this.password = this.employee.password;
    this.email = this.employee.email;
    this.phone = this.employee.phone_number;
    this.address = this.employee.user_address;
    this.isDriver = this.employee.isDriver;
    this.isActive = this.employee.is_active;
  }

  changeActive(){
    this.isActive = false;
  }

  async UpdateContactInfo(){
    let employee : Employee = new Employee(this.employee.employee_id, this.email, this.f_name, this.l_name, this.phone, this.username, 
      this.password, this.address, this.isActive, this.isActive, this.isDriver, this.employee.is_manager, this.employee.office);

    let updated: Employee = await this.employeeService.updateEmployee(employee)
    .then((onfulfilled) => {
      this.employee = onfulfilled;
      console.log(this.employee);
      return onfulfilled;
    })


    sessionStorage.setItem('User',JSON.stringify(this.employee));
    this.employee = JSON.parse(sessionStorage.getItem('User'));
  }

}
