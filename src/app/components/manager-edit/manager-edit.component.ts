import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.css']
})
export class ManagerEditComponent implements OnInit {
  employees:Array<Employee>= [];
  manager:Employee;

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
  
      alert(`{{employee.first_name}} ` + `{{employee.last_name}} ` + `was deleted!`);
      await this.ess.deleteEmployee(employee.employee_id);
      this.ngOnInit();
      
    }
    async promote(employee){
  
      employee.is_manager = true; 
      let tempE:Employee = await this.ess.updateEmployee(employee);
  
      this.ngOnInit(); 
      if(tempE.is_manager = true){
        alert(`{{employee.first_name}} ` + `{{employee.last_name}} ` + `was promoted!`); 
      }
    }

}
