import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from '../log.service';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class UserService {

    /**
     * This is an user service
     */
    @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

    /**
     * body to send update data
     */
    private body: string;

    // http headers
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private httpOptions = {
        headers: this.headers,
        observe: 'response' as 'body'
    };
    private authenticatedUserSubject = new ReplaySubject<User>(undefined);
    public authenticatedUser$ = this.authenticatedUserSubject.asObservable();

    /**
     * Set up the url string to the env var
     * Creates a new user object
     */
    url: string = environment.userUri;
    carUrl: string = environment.carUri;
    user: User = new User();

    /**
     * Constructor
     * @param http An HTTP client object
     * @param router A router
     * @param log A log service
     * @param authService An authorization service
     */

    constructor(private http: HttpClient, private router: Router, private log: LogService, private authService: AuthService) { }

    /**
     * A GET method for all users
     */

    getAllUsers() {
        return this.http.get<User[]>(this.url);
    }

    /**
     * A GET method for one user
     */
    getUserById(idParam: number) {
        return this.http.get<User>(this.url + idParam).toPromise();
    }


    getUserById2(idParam2: string): Observable<User> {
        return this.http.get<User>(this.url + idParam2);
    }

    /**
     * A POST method that switch an Rider to a Driver
     */
    createDriver(user: User, role) {

        user.active = true;
        user.isDriver = false;
        user.isAcceptingRides = false;
        console.log(user);

        this.http.post(this.url, user, { observe: 'response' }).subscribe(
            (response) => {
                this.authService.user = response.body;
                this.fireIsLoggedIn.emit(response.body);

                if (role === 'driver') {
                    this.router.navigate(['new/car']);
                } else {
                    this.router.navigate(['home/drivers']);
                }
            },
            (error) => {
                this.log.error(error);
            }
        );

    }

    // add user method
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.url, user, { headers: this.headers });
    }

    /**
     * This function returns the fireIsLoggedIn variable
     */

    getEmitter() {
        return this.fireIsLoggedIn;
    }

    /**
     * A PUT method that updates the user information
     */

    updateIsDriver(isDriver, userId) {

        this.getUserById(userId)
            .then((response) => {
                this.user = response;
                this.user.isDriver = isDriver;
                this.user.isAcceptingRides = (this.user.active && isDriver);

                this.http.put(this.url + userId, this.user).subscribe(
                    (putResponse) => {
                        this.authService.user = putResponse;
                        this.log.info(JSON.stringify(putResponse));
                    },
                    (error) => this.log.error(error)
                );
            })
            .catch(e => {
                this.log.error(e);
            });
    }

    /**
     * A PUT method that updates the preference of the user
     */
    updatePreference(property, bool, userId) {

        this.getUserById(userId)
            .then((response) => {
                this.user = response;
                this.user[property] = bool;
                if (property === 'active' && bool === false) {
                    this.user.isAcceptingRides = false;
                }

                this.http.put(this.url + userId, this.user).subscribe(
                    (putResponse) => {
                        this.authService.user = putResponse;
                    },
                    (error) => console.warn(error)
                );
            })
            .catch(e => {
                this.log.error(e);
            });
    }

    /**
     * A PUT method that updates user's information
     */

    updateUserInfo(user: User): Observable<object> {
        return this.http.put(this.url, user);
    }

    /**
     * A GET method that retrieves a driver by Id
     */
    getDriverById(id: number): Observable<any> {
        return this.http.get(this.url + id);
    }

    /**
     * A PUT method that changes the isAcceptingRide variable
     */
    changeDriverIsAccepting(data) {
        const id = data.userId;
        return this.http.put(this.url + id, data).toPromise();
    }

    getRidersForLocation(location: string): Observable<any> {
        return this.http.get(this.url + '?is-driver=false&location=' + location);
    }

    /**
     * A GET method that shows all users
     */
    showAllUser(): Observable<any> {
        return this.http.get(this.url);
    }

    /**
     * A function that bans users.
     */
    banUser(user: User) {
        this.body = JSON.stringify(user);
        this.http.put(`${this.url + user.userId}`, this.body, this.httpOptions).subscribe();
    }

    getRidersForLocation1(location: string): Observable<any> {
        return this.http.get(this.url + 'driver/' + location);
    }

    getRidersForLocation2(location: string): Observable<any> {
        return this.http.get(this.carUrl + 'driver/' + location);
    }
}
