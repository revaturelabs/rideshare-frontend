import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-profile-location',
    templateUrl: './profile-location.component.html',
    styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

    zipcode: number;
    city: string;
    address: string;
    address2: string;
    hState: string;
    currentUser: User;
    success: string;
    failure: string;

    constructor(private http: HttpClient, private userService: UserService) { }

    ngOnInit() {
        // TODO should be removed once navbar on login bug is fixed, as this method is already called on homepage retrieving key
        this.getGoogleApiKey();

        this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response) => {
            this.currentUser = response;
            this.zipcode = response.hZip;
            this.city = response.hCity;
            this.address = response.hAddress;
            this.address2 = response.wAddress;
            this.hState = response.hState;

        });
    }

    getGoogleApiKey() {
        this.http.get(`${environment.loginUri}getGoogleApi`)
            .subscribe(
                (response) => {

                    if (response["googleMapAPIKey"] !== undefined) {
                        new Promise(() => {
                            this.userService.googleApiKey = response['googleMapAPIKey'][0];
                        });
                    }
                }
            );
    }

    async updatesContactInfo() {
        this.currentUser.hZip = this.zipcode;
        this.currentUser.hCity = this.city;
        this.currentUser.hAddress = this.address;
        this.currentUser.wAddress = this.address2;
        this.currentUser.hState = this.hState;

        let didSucceed = true;
        const result = await this.userService.updateUserInfo(this.currentUser)
            .then((response) => {
                this.success = 'Successfully updated';
                this.failure = '';
                didSucceed = true;
            }).catch((e) => {
                // address invalidated/googleapi error
                didSucceed = false;
                this.failure = 'Invalid address submitted';
                this.success = '';
            });
    }
}
