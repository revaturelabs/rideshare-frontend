import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Admin } from 'src/app/models/admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = environment.adminUri;

  constructor(private http: HttpClient) { }

  getAllAdmins() {
		return this.http.get<Admin[]>(this.url);
	}
}
