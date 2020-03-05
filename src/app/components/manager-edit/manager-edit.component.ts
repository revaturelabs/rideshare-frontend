import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeServiceService } from '../../services/employee-service.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.css']
})
export class ManagerEditComponent implements OnInit {
  employees:Array<Employee>= [];
  manager:Employee;
  role:string;
  

  constructor(public ess:EmployeeServiceService) { }

  async populateEmployeeTable(){
    let tempE:Employee[] = await this.ess.getAllEmployees(); 
    this.employees = tempE;
  }
  
    ngOnInit() {
      this.manager = JSON.parse(sessionStorage.getItem('User'));
      this.populateEmployeeTable();
    }
  
    
    async delete(employee){
      this.employees = [];
      await this.ess.deleteEmployee(employee.employee_id);
      this.populateEmployeeTable();
      
    }
    async promote(employee){
      this.employees = [];
      employee.is_manager = true; 
      await this.ess.updateEmployee(employee);
      this.populateEmployeeTable();
    }

}
