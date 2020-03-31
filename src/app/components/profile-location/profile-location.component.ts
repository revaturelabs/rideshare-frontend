import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';

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

    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit() {
        this.authService.authenticatedUserSubject.subscribe((user) => {
            this.currentUser = user;
            this.zipcode = user.hZip;
            this.city = user.hCity;
            this.address = user.hAddress;
            this.address2 = user.wAddress;
            this.hState = user.hState;
        });
    }

    updatesContactInfo() {
        this.currentUser.hZip = this.zipcode;
        this.currentUser.hCity = this.city;
        this.currentUser.hAddress = this.address;
        this.currentUser.wAddress = this.address2;
        this.currentUser.hState = this.hState;
        this.userService.updateUserInfo(this.currentUser);
        this.success = 'Updated Successfully!';
    }
}
