import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private url: string = "http://localhost:8080/users/"; 
  private body: string;
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"}), 
    observe: "response" as "body"
  };

  showAllDrivers(): Observable<User> {
    return this.httpClient.get<User>(this.url); 
  }


}
