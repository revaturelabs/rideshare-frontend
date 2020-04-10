import { Component, OnInit, TemplateRef,Renderer2, Inject} from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { DOCUMENT } from '@angular/common';
import { ValidationService } from '../../validation.service';
import {Batch} from 'src/app/models/batch';
import {User} from 'src/app/models/user';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Registration } from 'src/app/models/registration';
import { UserService } from 'src/app/services/user-service/user.service';
/*** In this commit, I:
  -downloaded the google places package by issuing "npm install ngx-google-places-autocomplete",
  -imported GooglePlaceModule from "ngx-google-places-autocomplete",
  -implemented the appropriate directive/event attributes/bindings in the address field input,
  -and implemented the options object and the handleAddressChange() method, found below.
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { Batch } from 'src/app/models/batch';
import { User } from 'src/app/models/user';



/*** 
 ***/



@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})

export class SignupModalComponent implements OnInit {

  signUpForm: FormGroup;
  modalRef :BsModalRef;
  batch: Batch;

  batchNumber: string;
  batchLocation: string;
  
  registration: Registration;
  //Non-FormGroup form items.
  user: User;

  isDriver: boolean = null;
  addressLine: string;
  city: string;
  state: string;
  batches:Batch[];
  //Google places autocomplete options.
  options = {
    componentRestrictions : {
      country: ['US']
    }
  }

  constructor(private modalService :BsModalService, private userService: UserService, private batchService:BatchService ) { }

  ngOnInit() {
  this.batchService.getAllBatches().subscribe(data => {
    this.batches = data;
    sessionStorage.setItem('Batches',JSON.stringify(this.batches));
})
  this.batches= JSON.parse(sessionStorage.getItem('Batches'));
  console.log(this.batches)

  
  this.signUpForm = new FormGroup({
    'firstname': new FormControl('', [Validators.required,Validators.minLength(2),
            Validators.maxLength(35), 
            ValidationService.stringValidator]),
    'lastname': new FormControl('', [Validators.required,Validators.minLength(2),
            Validators.maxLength(35), 
            ValidationService.stringValidator]),
    'email': new FormControl('', [Validators.required,ValidationService.emailValidator]),
    'phonenumber': new FormControl('', [Validators.required,ValidationService.phoneNumberValidator,Validators.minLength(10) ]),
    'batch': new FormControl('', [Validators.required]),

    //to be addressed *budump-ts 
    'address': new FormControl(''),
    'city': new FormControl(''),
    'state': new FormControl(''),
    'zipcode': new FormControl('', [Validators.required,Validators.minLength(5)] ),
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })    
}

  // get f() { return this.signUpForm.controls; }

  openModal(template :TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(this.batches);
  }

  setDriver(){
    if(!this.isDriver){
      this.isDriver=true;
      console.log("Registerer is a driver.");
    }
  }
  setRider(){
    if(this.isDriver||this.isDriver==null){
      this.isDriver=false;
      console.log("Registerer is a rider.");
    }
  }
  setBatch() {
    let batchSplit = this.signUpForm.value.batch.split(".",2);
    this.batchNumber = batchSplit[0];
    this.batchLocation = batchSplit[1];
  }

  //When username field is changed.
  handleUsernameChange() {
    //Write a method that checks if the username added is already existing.
  }
  
  public handleAddressChange(address: any) {
    let splitted = (address.srcElement.value).split(", ", 3);
    this.addressLine = splitted[0];
    this.city = splitted[1];
    this.state = splitted[2];
    if(this.city == null) {
      this.addressLine = null;
      this.city = null;
      this.state = null;
    }else {
      return;
    }
  }

  /** ONSUBMIT()
    This method is invoked when the FormGroup is submitted. We don't have to pass the form as a
    parameter because it is generated programmatically within this component.*/
  onSubmit() {
    this.setBatch();

    this.printSubmitLogs();
    this.prepareModels();
   
    console.log(this.batchNumber);
    console.log(this.batchLocation); 
    
    this.sendFormHttpPost();
    this.flushData();
  }

  /** PRINTSUBMITLOGS()
    This method is for testing purposes. As you can plainly see, it is used to log things to the 
    console and get insight on what is happening in the code.*/
  printSubmitLogs() {
    console.log("The this.signUpForm.status value is: " + this.signUpForm.status);
    console.log("This evaluates to: " + Boolean(this.signUpForm.status == "INVALID"));
    console.log(this.signUpForm);
  }

  
  /** PREPAREMODELS()
    This method creates the required objects for the http request that registers a new user. It 
    then populates them with the values generated by this component/template.*/
  prepareModels() {
    this.batch = new Batch(
      this.batchNumber, 
      this.batchLocation
    );
    this.user = new User();
      this.user.batch = this.batch;
      this.user.isDriver = this.isDriver;
      this.user.firstName = this.signUpForm.value.firstname;
      this.user.lastName = this.signUpForm.value.lastname;
      this.user.email = this.signUpForm.value.email;
      this.user.phoneNumber = this.signUpForm.value.phonenumber;
      this.user.hAddress = this.addressLine;
      this.user.hCity = this.city;
      this.user.hState = this.state;
      this.user.hZip = this.signUpForm.value.zipcode;
      //THESE WORK ADDRESS FIELDS ARE REQUIRED BY THE BACKEND FOR THE FORM TO SUBMIT SUCCESSFULLY.
      this.user.wAddress = this.addressLine;
      this.user.wCity = this.city;
      this.user.wState = this.state;
      this.user.wZip = this.signUpForm.value.zipcode;
      //YOU WILL GET A 500 RETURN STATUS BECAUSE THERE WON'T BE ANY RESPONSE.
      this.user.userName = this.signUpForm.value.username;
      //NOTE: WE CANNOT PASS THE PASSWORD BECAUSE IT DOESNT EXIST IN THE SPRING USER MODEL.
      //NOTE: YOU CANNOT CREATE A NEW MODEL OR CHANGE USER WITHOUT REFACTORING A LOT OF CODE.
      //      THE BACKEND IS EXPECTING A SPECIFIC OBJECT WITH SPECIFIC PARAMETERS.
      //      USER IS ALSO A DEPENDENCY OF OTHER COMPONENTS IN THE FRONTEND, SO DON'T ADD A PARAMETERIZED CONSTRUCTOR.
    //(TESTING)Log the Registration model.
    console.log("Sending this user object: " + this.user);
    console.log(this.user);
  }

  /** SENDFORMHTTPPOST()
    This method uses the injected UserService to send an http post containing the User object. This method 
    has no parameters because the User object is available to the component and the service is injected.*/
  sendFormHttpPost() {
    this.userService.addUser(this.user).subscribe(res =>{
      console.log(res)
    }, error=>{
      console.log(error)
    })
  }

  /** FLUSHDATA()
    This method destroys all created objects and resets the form to a pristine condition. It should be invoked at 
    the ass-end of the ONSUBMIT method, after the http post for a new user succeeds.*/
  flushData() {
    this.isDriver = null;
    this.addressLine = null;
    this.city = null;
    this.state = null;
    this.signUpForm.reset();
    this.user = null;
    this.batch = null;
  }
}