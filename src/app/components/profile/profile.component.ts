import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor( private router: Router) { }
  showCont :boolean = false;
  showCar :boolean = false;
  showLocation :boolean = false;
  showMemberInfo :boolean = false;

  contact :string = '';
  car :string = '';
  location :string = '';
  membership :string = '';

  ngOnInit() {
    this.showCont = true;
  /**
   * A GET method that retrieves user's information
   */
}
  showContact() {
    this.showCont = true;
    this.showCar = false;
    this.showLocation = false;
    this.showMemberInfo = false;
    
    this.contact = 'profileBtn';
    this.car = '';
    this.location = '';
    this.membership = '';

  }

  showLoc(){
    this.showCont = false;
    this.showCar = false;
    this.showLocation = true;
    this.showMemberInfo = false;
    
    this.contact = '';
    this.car = '';
    this.location = 'profileBtn';
    this.membership = '';
  }

  showMembership(){
    this.showCont = false;
    this.showCar = false;
    this.showLocation = false;
    this.showMemberInfo = true;
    
    this.contact = '';
    this.car = '';
    this.location = '';
    this.membership = 'profileBtn';
  }

  showCarInfo(){
    this.showCont = false;
    this.showCar = true;
    this.showLocation = false;
    this.showMemberInfo = false;
    
    this.contact = '';
    this.car = 'profileBtn';
    this.location = ''; 
    this.membership = '';

  }
}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from 'src/app/services/user-service/user.service';
// import { User } from 'src/app/models/user';
// import { Batch } from 'src/app/models/batch';
// import { BatchService } from 'src/app/services/batch-service/batch.service';
// import { ValidationService } from 'src/app/services/validation-service/validation.service';
// import { AuthService } from 'src/app/services/auth-service/auth.service';
// import { LogService } from 'src/app/services/log.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {

//   /**
//    * Instantiates user, newUser, batches, oldBatchNumber and oldBatchLocation
//    */

//   user: User = new User();
//   newUser: User = new User();
//   batch: Batch = new Batch();
//   batches: Batch[] = [];
//   oldBatchNumber: number;
//   oldBatchLocation: string;

//   /**
//    * Set fields property
//    */

//   editable: string = '';
//   noChange: boolean = false;
//   updateSuccess: boolean = false;
//   updateFailed: boolean = false;

//   /**
//    * Constructor
//    * @param log A log service
//    * @param router Provides an instance of a router.
//    * @param userService An user service is instantiated.
//    * @param batchService A batch service is instantiated
//    * @param validationService A validation service is instantiated
//    * @param authService An authorization service is instantiated
//    */
//   constructor(private log: LogService, private router: Router, private userService: UserService, private batchService: BatchService, public validationService: ValidationService, private authService: AuthService) { }

//   ngOnInit() {
//     this.user.userId = this.authService.user.userId;;
//     if (!this.user.userId) {
//       this.router.navigate(['']);
//     } else {
//       this.getUserInfo();
//     }
//   }

//   /**
//    * A GET method that retrieves user's information
//    */

//   getUserInfo() {
//     this.user.batch = this.batch;
//       this.userService.getUserById(this.user.userId).then(response => {
//         if (response) {
//           this.user = response;
//           this.oldBatchNumber = this.user.batch.batchNumber;
//           this.oldBatchLocation = this.user.batch.batchLocation;
//           this.newUser = Object.assign({}, this.user);

//           this.batches = this.batchService.getAllBatches();
//           this.batches = this.batches.filter(batch => batch.batchNumber === this.user.batch.batchNumber).concat(this.batches.filter(batch => batch.batchNumber !== this.user.batch.batchNumber))
//         } else {
//           this.authService.user = {};
//           this.router.navigate(['']);
//         }
//       })
//   }

//   /**
//    * A method that compares two users
//    */

//   compareUser() {
//     return this.user.firstName.toLowerCase() === this.newUser.firstName.toLowerCase() && this.user.lastName.toLowerCase() === this.newUser.lastName.toLowerCase() && this.user.userName === this.newUser.userName && this.user.email === this.newUser.email && this.validationService.phoneFormat(this.user.phoneNumber) === this.validationService.phoneFormat(this.newUser.phoneNumber) && this.user.batch.batchNumber === this.oldBatchNumber;
//   }

//   /**
//    * A function that changes the batch location
//    * @param event 
//    */

//   changeLocation(event) {
// 		let option = event.target.options.selectedIndex;
//     this.newUser.batch.batchNumber = this.batches[option].batchNumber;
//     this.newUser.batch.batchLocation = this.batches[option].batchLocation;
// 	}

//   /**
//    * A function that update the profile
//    */
  
//   updateProfile() {
//     if (this.validationService.validateUserName(this.newUser.userName) && this.validationService.validateName(this.newUser.firstName) && this.validationService.validateName(this.newUser.lastName) && this.validationService.validateEmail(this.newUser.email) && this.validationService.validatePhone(this.newUser.phoneNumber)) {
//       this.editable = '';
//       if (this.compareUser()) {
//         this.noChange = true;
//         this.newUser = Object.assign({}, this.user);
//         setTimeout(() => this.noChange = false, 3000);
//       } else {
//         this.newUser.firstName = this.validationService.nameFormat(this.newUser.firstName);
//         this.newUser.lastName = this.validationService.nameFormat(this.newUser.lastName);
//         this.newUser.phoneNumber = this.validationService.phoneFormat(this.newUser.phoneNumber);
//         this.newUser.batch.batchLocation = this.user.batch.batchLocation;
//         this.newUser.batch.batchNumber = this.user.batch.batchNumber;

//         this.userService.updateUserInfo(this.newUser).then(response => {
//           this.authService.user = response;
//           this.log.info("updated user info: " + '\n' + JSON.stringify(response));          
//           this.getUserInfo();
//           this.updateSuccess = true;
//           setTimeout(() => this.updateSuccess = false, 5000);
//         }, error => {
//           this.log.error(error);
//           this.updateFailed = true;
//           setTimeout(() => this.updateFailed = false, 5000);
//         })
//       }
//     }
//   }

//   /**
//    * A method that allow edits on the attribute
//    * @param attribute 
//    */

//   edit(attribute) {
//     if (this.editable === attribute) {
//       this.editable = '';
//     } else {
//       this.editable = attribute;
//     }
//   }

//   /**
//    * A function that restore changes to the batch object.
//    */
//   restoreChange() {
//     this.editable = '';
//     this.newUser = Object.assign({}, this.user);
//     this.newUser.batch.batchNumber = this.oldBatchNumber;
//     this.newUser.batch.batchLocation = this.oldBatchLocation;
//   }
// }



