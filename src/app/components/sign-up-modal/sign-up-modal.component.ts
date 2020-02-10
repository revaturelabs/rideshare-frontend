import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  fname :string;
  lname :string;
  email :string;
  password :string;
  address :string;
  isDriver: boolean;
  isRider: boolean;

  user :User = new User();
  batch: Batch = new Batch();
  batches: Batch[];
  // validation
  firstNameError :string;
  lastNameError :string;
  emailError :string;
  phoneNumberError :string;
  userNameError :string;
  hAddressError :string;
  hStateError :string;
  hCityError :string;
  hZipError :string;
  wStateError :string;
  wAddressError :string;
  wCityError :string;
  wZipError :string;
  success :string;
  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef :BsModalRef;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  constructor(private modalService :BsModalService, private userService :UserService, private batchService :BatchService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        //console.log(res);
      }
    );

  this.batchService.getAllBatchesByLocation1().subscribe(
      res => {
         this.batches = res;
          },
      );
  }
  //Opens 'sign up' modal that takes in a template of type 'ng-template'.

  openModal(template :TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

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
    this.wStateError='';
    this.wAddressError='';
    this.wCityError='';
    this.wZipError='';
    this.success='';
    let driver = <HTMLInputElement> document.getElementById("driver");  
    let rider = <HTMLInputElement> document.getElementById("rider");  

    if(driver.checked == true){
      this.user.isDriver =  true;
    }
    if(rider.checked == true){
      this.user.isDriver =  false;
    }
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        if(res.firstName != undefined){
          this.firstNameError = res.firstName[0];
        }
        else if(res.lastName != undefined){
          this.lastNameError = res.lastName[0];
        }
        else if(res.phoneNumber != undefined){
          this.phoneNumberError = res.phoneNumber[0];
        }
        else if(res.email != undefined){
          this.emailError = res.email[0];
        }
        else if(res.userName != undefined){
          this.userNameError = res.userName[0];
        }
        else if(res.hState != undefined){
          this.hStateError = res.hState[0];
        }
        else if(res.hAddress != undefined){
          this.hAddressError = res.hAddress[0];
        }
        else if(res.hCity != undefined){
          this.hCityError = res.hCity[0];
        }
        else if(res.hZip != undefined){
          this.hZipError = res.hZip[0];
        }
        else if(res.wState != undefined){
          this.wStateError = res.wState[0];
        }
        else if(res.wAddress != undefined){
          this.wAddressError = res.wAddress[0];
        }
       
        else if(res.wCity != undefined){
          this.wCityError = res.wCity[0];
        }
        else if(res.wZip != undefined){
          this.wZipError = res.wZip[0];
        }else {
          this.success = "register successfully!";
        }
      }, 
      /*res => {
        console.log("failed to add user");
        console.log(res);
      }*/
    );
  }
  
}
