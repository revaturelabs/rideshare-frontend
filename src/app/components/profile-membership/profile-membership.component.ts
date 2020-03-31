import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
    selector: 'app-profile-membership',
    templateUrl: './profile-membership.component.html',
    styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
    profileObject: User;
    currentUser: any = '';
    batchNumber = 'Not Set';
    batchLocation = '';

    result = 'Updated Successfully!';
    resultColor = '';
    resultVisible = 'hidden';

    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit() {
        this.authService.authenticatedUserSubject.subscribe((response) => {
            this.profileObject = response;

            if (this.profileObject.batch != null) {
                this.batchLocation = this.profileObject.batch.batchLocation;
                this.batchNumber = this.profileObject.batch.batchNumber.toString();
            }
        });
    }

    updatesMembershipInfo() {
        this.userService.updateUserInfo(this.profileObject).subscribe((response) => {

            this.result = 'Updated Successfully!';
            this.resultColor = 'green';
            this.resultVisible = 'visible';
        }, error => {

            // likely server error
            this.result = 'Error ' + error.status;
            this.resultColor = 'red';
            this.resultVisible = 'visible';
        });
    }
}
