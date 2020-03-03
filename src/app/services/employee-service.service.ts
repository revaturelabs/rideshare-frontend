import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Employee} from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }

  getEmployeeById(employee_id:number):Promise<Employee>{

    return this.http.get<Employee>(`http://localhost:9999/employees/${employee_id}`).toPromise();
  }

  getAllEmployees():Promise<Employee[]>{

    return this.http.get<Employee[]>(`http://localhost:9999/employees`).toPromise();
  }

  login(user:Employee):Promise<Employee>{
   
    return this.http.post<Employee>(`http://localhost:9999/employees/login`,user).toPromise();
  }

  addEmployee(user:Employee):Promise<Employee>{

    return this.http.post<Employee>(`http://localhost:9999/employees/register`,user).toPromise();

  }

  deleteEmployee(employee_id:number):Promise<any>{

    return this.http.delete<any>(`http://localhost:9999/employees/${employee_id}`).toPromise();

  }

  updateEmployee(user:Employee):Promise<Employee>{

    return this.http.put<Employee>(`http://localhost:9999/employees`,user).toPromise();

  }

}