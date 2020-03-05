import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Employee} from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }

  getEmployeeById(employee_id:number):Promise<Employee>{

    return this.http.get<Employee>(`http://localhost:9999/employees/${employee_id}`).toPromise();
  }

  getEmployeeByUsername(user_name:string):Promise<Employee>{

    return this.http.get<Employee>(`http://localhost:9999/employees/username/${user_name}`).toPromise();
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
  getDriversForLocation(location: string): Observable <any>{
    return this.http.get('http://localhost:9999/employees/driver/'+ location)
    
	}

}