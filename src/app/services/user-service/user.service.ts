import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from "../log.service"
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: "root"
})
export class UserService {
  /**
   * This is an user service
   */
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  // http headers
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  /**
   * Set up the url string to the env var
   * Creates a new user object
   */
  url: string = environment.userUri;
  user: User = new User();

  /**
   * Constructor
   * @param http An HTTP client object
   * @param router A router
   * @param log A log service
   * @param authService An authorization service
   */

  constructor(
    private http: HttpClient,
    private router: Router,
    private log: LogService,
    private authService: AuthService
  ) {}

  /**
   * A GET method for all users
   */

  getAllUsers() {
    return this.http.get<User[]>(this.url);
  }

  /**
   * A GET method for one user
   * @param idParam
   */
  getUserById(idParam: number) {
    console.log(this.url);
    return this.http.get<User>(this.url + idParam).toPromise();
  }

  getUserById2(idParam2: String): Observable<User> {
    //console.log(this.url)
    return this.http.get<User>(this.url + idParam2);
  }

  /**
   * A POST method that switch an Rider to a Driver
   * @param user
   * @param role
   */
  createDriver(user: User, role) {
    user.active = true;
    user.isDriver = false;
    user.isAcceptingRides = false;
    console.log(user);

    this.http.post(this.url, user, { observe: "response" }).subscribe(
      response => {
        this.authService.user = response.body;
        this.fireIsLoggedIn.emit(response.body);

        if (role === "driver") {
          this.router.navigate(["new/car"]);
        } else {
          this.router.navigate(["home/drivers"]);
        }
      },
      error => {
        this.log.error(error);
      }
  
    /**
     * A function that bans users.
     */
    banUser(user: User){
      this.body = JSON.stringify(user);
      this.http.put(`${this.url + user.userId}`,this.body,this.httpOptions).subscribe();
	}
	
	getRidersForLocation1(homeLocation: string, workLocation: string, sort:string): Observable <any>{
		return this.http.get(this.url + 'driver/'+ homeLocation +'/'+ workLocation + '/'+ sort 
		)
		
		
	}
}
}
