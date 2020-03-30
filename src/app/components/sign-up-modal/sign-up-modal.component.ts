import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';

/**
 * @export
 * @class SignupModalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  /**
   * @type {string}
   * @memberof SignupModalComponent
   */
  fname :string;
  lname :string;
  username :string;
  email :string;
  phone :string;
  address :string;
  isDriver: boolean;
  isRider: boolean;
/**
 * @type {User}
 * @memberof SignupModalComponent
 */
  user :User = new User();
  batch: Batch = new Batch();
  batches: Batch[];
  /**
   * Fields for validation
   */
  firstNameError :string;
  lastNameError :string;
  emailError :string;
  phoneNumberError :string;
  userNameError :string;
  hAddressError :string;
  hStateError :string;
  hCityError :string;
  hZipError :string;
  /**
   *
   *
   * @type {string}
   * @memberof SignupModalComponent
   */
  success :string;
  /**
   * Store the retrieved template from the 'openModal' method for future use cases.
   */
  modalRef :BsModalRef;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  /**
   *Creates an instance of SignupModalComponent.
   * @param {BsModalService} modalService
   * @param {UserService} userService
   * @param {BatchService} batchService
   * @param {ValidationService} validationService
   * @memberof SignupModalComponent
   */
  constructor(private modalService :BsModalService, private userService :UserService, private batchService :BatchService, private validationService :ValidationService) { }
/**
 * OnInit function
 *
 * @memberof SignupModalComponent
 */
ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
      }
    );

  this.batchService.getAllBatchesByLocation1().subscribe(
      res => {
         this.batches = res;
          },
      );
  }
/**
 *
 * Function that opens 'sign up' modal that takes in a template of type 'ng-template'.
 * @param {TemplateRef<any>} template
 * @memberof SignupModalComponent
 */
openModal(template :TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
/**
 * Function that submits user information and status
 *
 * @memberof SignupModalComponent
 */
submitUser() {
    this.user.userId = 0;
    this.firstNameError = '';
    this.lastNameError = '';
    this.phoneNumberError ='';
    this.userNameError ='';
    this.emailError ='';
    this.hStateError='';
    this.hAddressError='';
    this.hCityError='';
    this.hZipError='';
    this.success='';
    this.user.wAddress = this.user.hAddress;
    this.user.wState = this.user.hState;
    this.user.wCity = this.user.hCity;
    this.user.wZip = this.user.hZip;
    let driver = <HTMLInputElement> document.getElementById("driver");
    let rider = <HTMLInputElement> document.getElementById("rider");

    if(driver.checked == true){
      this.user.isDriver =  true;
    }
    if(rider.checked == true){
      this.user.isDriver =  false;
    }
    this.userService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        let i = 0;
        if(res.firstName != undefined){
          this.firstNameError = res.firstName[0];
          i = 1;
        }
        if(res.lastName != undefined){
          this.lastNameError = res.lastName[0];
          i = 1;

        }
        if(res.phoneNumber != undefined){
          this.phoneNumberError = res.phoneNumber[0];
          i = 1;

        }
        if(res.email != undefined){
          this.emailError = res.email[0];
          i = 1;

        }
        if(res.userName != undefined){
          this.userNameError = res.userName[0];
          i = 1;

        }
        if(res.hState != undefined){
          this.hStateError = res.hState[0];
          i = 1;

        }
        if(res.hAddress != undefined){
          this.hAddressError = res.hAddress[0];
          i = 1;

        }
        if(res.hCity != undefined){
          this.hCityError = res.hCity[0];
          i = 1;

        }
        if(res.hZip != undefined){
          this.hZipError = res.hZip[0];
          i = 1;

        }
        if(i === 0) {
          i = 0;
          this.success = "Registered successfully!";
        }
      }
    );

  }
}
