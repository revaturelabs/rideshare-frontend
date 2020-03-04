import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Office} from '../Models/Office';

@Injectable({
  providedIn: 'root'
})
export class OfficeServiceService {

  constructor(private http:HttpClient) { }

  getOfficeById(office_id:number):Promise<Office>{

    return this.http.get<Office>(`http://localhost:9999/offices/${office_id}`).toPromise();
  }


  getAllOffices():Promise<Array<Office>>{

    return this.http.get<Array<Office>>(`http://localhost:9999/offices`).toPromise();
  }

  //this register one
  getAllOffices1():Promise<Office[]>{

    return this.http.get<Office[]>(`http://localhost:9999/offices`).toPromise();
  }

  addOffice(office:Office):Promise<Office>{
   
    return this.http.post<Office>(`http://localhost:9999/offices`,office).toPromise();
  }

  deleteOffice(office_id:number):Promise<boolean>{

    return this.http.delete<boolean>(`http://localhost:9999/offices/${office_id}`).toPromise();

  }

  updateOffice(office:Office):Promise<Office>{

    return this.http.put<Office>(`http://localhost:9999/offices`,office).toPromise();

  }
}
