import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Admin } from 'src/app/models/admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = environment.adminUri;

  /**
   * This is the constructor
   * @param http Creates HttpClient instance
   */
  constructor(private http: HttpClient) { }

  /**
   * This function gets a list of all admins
   */
  getAllAdmins() {
		return this.http.get<Admin[]>(this.url);
	}
}
