import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  /**
   * Set the url string to the env var
   * An user is created.
   */

  url: string = environment.carUri;
  user: User = new User();

  /**
   * This constructor injects a HTTP client, a router and an user service
   * @param http An HTTP client
   * @param router A router
   * @param userService An user service
   */

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  /**
   * This function fetches all seats from the database.
   */

  getAllSeats() {
    return this.http.get<Car[]>(this.url);
  }

  /**
   * This function returns an car by user ID.
   * @param userId
   */

  getSeatsByUserId(userId: number) {
    return this.http.get<Car>(`${this.url}users/${userId}`).toPromise();
  }

}
