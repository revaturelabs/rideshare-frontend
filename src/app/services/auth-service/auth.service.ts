import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import RequestError from 'src/app/models/request-error';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /**
     * This is the Authorization Service
     */
    @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
    loggedIn = false;

    public authenticatedUserSubject = new ReplaySubject<User>(undefined);
    public authenticatedUser$ = this.authenticatedUserSubject.asObservable();

    private loginErrorsSubject = new ReplaySubject<Array<RequestError>>(undefined);
    public loginErrors$ = this.loginErrorsSubject.asObservable();

    /**
     * This is the constructor
     * @param router Creates a router instance
     */
    constructor(private router: Router, private httpClient: HttpClient) { }

    /**
     * An user object is created
     */
    public user: any = {};
    public admin: Admin = new Admin();

    /**
     * This function logs the user into the application
     */
    login(username: string, password: string) {
        // Get Login API URL from environment
        const { loginV2Uri: api } = environment;

        // Create credentials object to pass as request body
        const credentials = { username, password };

        // Sends post request with login credentials
        this.httpClient.post<User>(`${api}`, credentials, {
            observe: 'response'
        }).subscribe(response => {
            console.log(response);
            const user: User = response.body;
            this.authenticatedUserSubject.next(user);
        }, errResponse => {
            // Process possible errors
            switch (errResponse.status) {
                case 400:
                    const errorMessages = errResponse.error.errors.map(e => ({
                        message: e.defaultMessage,
                        element: e.field
                    }));

                    this.updateErrorMessage(errorMessages);
                    break;
                case 401:
                    this.updateErrorMessage([{
                        message: errResponse.error,
                        element: 'misc'
                    }]);
                    break;
                default:
                    this.updateErrorMessage([{
                        message: 'An unknown error occurred',
                        element: 'misc'
                    }]);
            }
        });
    }

    updateErrorMessage(errors: RequestError[]) {
        this.loginErrorsSubject.next(errors);
    }

    /**
     * This function returns an emitter.
     */

    loginAsAdmin(admin: Admin, userName: string) {
        if (admin.userName === userName) {
            this.admin = admin;
            this.router.navigate(['/admin']);
            this.fireIsLoggedIn.emit(this.admin);
        } else {
            return false;
        }
    }

    getEmitter() {
        return this.fireIsLoggedIn;
    }
}
