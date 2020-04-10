import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { ValidationService } from '../../validation.service';
import { Batch } from 'src/app/models/batch';
import { User } from 'src/app/models/user';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { UserService } from 'src/app/services/user-service/user.service';



/***
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { UserService } from 'src/app/services/user-service/user.service';
  import { Batch } from 'src/app/models/batch';
  import { User } from 'src/app/models/user';
 ***/



@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})

export class SignupModalComponent implements OnInit {
  
  //Objects and models.
  signUpForm: FormGroup;
  modalRef :BsModalRef;
  user: User;
  batch: Batch;
  options = {componentRestrictions : {
      country: ['US']
    }
  }
  batches:Batch[];
  batchNumber: string;
  batchLocation: string;
  isDriver: boolean = null;
  addressLine: string;
  city: string;
  state: string;

  constructor(private modalService :BsModalService, private userService: UserService, private batchService:BatchService ) { }

  ngOnInit() {
    this.getBatchList();
    this.generateFormGroup();
  }



  openModal(template :TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getBatchList() {
    this.batchService.getAllBatches().subscribe(data => {
      this.batches = data;
      sessionStorage.setItem('Batches',JSON.stringify(this.batches));
    })
    this.batches= JSON.parse(sessionStorage.getItem('Batches'));
  }

  generateFormGroup() {
    this.signUpForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),//, ValidationService.stringValidator
      'lastname': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),//, ValidationService.stringValidator
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phonenumber': new FormControl('', [Validators.required, Validators.minLength(10)]),//, ValidationService.phoneNumberValidator
      'batch': new FormControl('', Validators.required),
      //to be addressed *budump-ts 
      'address': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'zipcode': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'username': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),//These validators are required by the database.
      'password': new FormControl('', Validators.required)
    })
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

  /** SETBATCH()
    This method is invoked once upon initialization to fetch the list of active batches from the 
    database and make them available to the form. The BATCHES array is used to generate the batch 
    input field's select element with option elements.*/
  setBatch() {
    let batchSplit = this.signUpForm.value.batch.split(".",2);
    this.batchNumber = batchSplit[0];
    this.batchLocation = batchSplit[1];
  }

  /** HANDLEUSERNAMECHANGE()
    This method is invoked when the username input field is changed. It activates AJAX requests 
    that check if the username that the user has entered already exists in the database.*/
  handleUsernameChange() {
    //TODO: Write a method that uses AJAX to check if the username added is already existing.
  }

  /** HANDLEADDRESSCHANGE()
    This method is called on an event listener for when the autocomplete field is changed. It 
    updates the address values of the FormGroup.*/
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

    console.log();

    console.log("* * * * * * START OF printSubmitLogs() LOGS * * * * * *");
    this.printSubmitLogs();
    console.log("* * * * * * END OF printSubmitLogs() LOGS * * * * * *");
    
    console.log();

    console.log("* * * * * * START OF prepareModels() LOGS * * * * * *");
    this.prepareModels();
    console.log("* * * * * * END OF prepareModels() LOGS * * * * * *");
    
    console.log();

    console.log("* * * * * * START OF sendFormHttpPost() LOGS * * * * * *");
    this.sendFormHttpPost();
    console.log("* * * * * * END OF sendFormHttpPost() LOGS * * * * * *");

    console.log();

    console.log("* * * * * * START OF flushData() LOGS * * * * * *");
    this.flushData();
    console.log("* * * * * * END OF flushData() LOGS * * * * * *");
    
    console.log();
  }

  /** PRINTSUBMITLOGS()
    This method is for testing purposes. As you can plainly see, it is used to log things to the 
    console and get insight on what is happening in the code.*/
  printSubmitLogs() {
    console.log("    User is a driver? = " + this.isDriver + ";");
    console.log("    Batch number = " + this.batchNumber + ";  Batch location = " + this.batchLocation + ";");
    console.log("    The this.signUpForm.status value is: " + this.signUpForm.status + ";");
    console.log("    This evaluates to: " + Boolean(this.signUpForm.status == "INVALID") + ";");
    console.log("    The submitted form follows:");
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
    console.log("    The batch object follows:");
    console.log(this.batch);
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
    console.log("    Prepared the user object as follows:");
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
    console.log("    Flushing data...");
    this.isDriver = null;
    this.addressLine = null;
    this.city = null;
    this.state = null;
    this.signUpForm.reset();
    this.user = null;
    this.batch = null;
    console.log("    batch object follows:");
    console.log(this.batch);
    console.log("    isDriver variable follows:");
    console.log(this.isDriver);
    console.log("    user object follows:");
    console.log(this.user);
    console.log("    signUpForm object follows:");
    console.log(this.signUpForm);
  }
}