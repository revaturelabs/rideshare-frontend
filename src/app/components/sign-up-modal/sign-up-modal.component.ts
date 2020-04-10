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
/*** In this commit, I:
  -downloaded the google places package by issuing "npm install ngx-google-places-autocomplete",
  -imported GooglePlaceModule from "ngx-google-places-autocomplete",
  -implemented the appropriate directive/event attributes/bindings in the address field input,
  -and implemented the options object and the handleAddressChange() method, found below.
 ***/



@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  //FormGroup and bootstrap css modal.
  signUpForm: FormGroup;
  modalRef :BsModalRef;
  //Imported models to assemble a User.
  batch: Batch;
  batchNumber: Number;
  batchLocation:String;
  registration: Registration;
  //Non-FormGroup form items.
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

  constructor(private modalService :BsModalService, private googleApi:GoogleApiService,  private renderer2: Renderer2,@Inject(DOCUMENT) private _document: Document, private formBuilder: FormBuilder, private batchService:BatchService ) { }

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
    console.log(this.batches)
    this.batches=this.batches;
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

  public handleAddressChange(address: any) {
    let splitted = (address.srcElement.value).split(", ", 3);
    this.addressLine = splitted[0];
    this.city = splitted[1];
    this.state = splitted[2];
  }

  onSubmit() {
   let batchSplit = this.signUpForm.value.batch.split(".",2);
   this.batchNumber=batchSplit[0];
   this.batchLocation=batchSplit[1];
    console.log(this.batchNumber);
    console.log(this.batchLocation);
   // this.printSubmitLogs();
  //  this.prepareModels();

   
  } 

  printSubmitLogs() {
    //(TESTING)Log FormGroup validity.
    console.log(this.signUpForm.status);
    console.log("This evaluates to: " + Boolean(this.signUpForm.status == "INVALID"));
    //(TESTING)Log the FormGroup.
    console.log(this.signUpForm);
  }

  // prepareModels() {
  //   //Prepare the Batch model to inject into the Registration model.
  //   // this.batch.batchNumber =
  //   //   this.signUpForm.value.batch;
  //   //Prepare the Registration.
  //   this.registration = new Registration(
  //     this.batch,
  //     this.isDriver,
  //     this.signUpForm.value.firstname,
  //     this.signUpForm.value.lastname,
  //     this.signUpForm.value.email,
  //     this.signUpForm.value.phonenumber,
  //     this.addressLine,
  //     this.city,
  //     this.state,
  //     this.signUpForm.value.zipcode,
  //     this.signUpForm.value.username,
  //     this.signUpForm.value.password
  //   );


  //   //(TESTING)Log the Registration model.
  //   console.log(this.registration);
    
  // }

  flushData() {
    //Reset the address strings.
    this.addressLine = null;
    this.city = null;
    this.state = null;
    //Reset the form.
    this.signUpForm.reset();
    //Free the models.
    this.registration = null;
    this.batch = null;
  }
}