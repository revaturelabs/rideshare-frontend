import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Batch } from 'src/app/models/batch';
import { User } from 'src/app/models/user';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { UserService } from 'src/app/services/user-service/user.service';
@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  signUpForm: FormGroup;
  modalRef: BsModalRef;
  user: User;
  batches: Batch[];
  batch: Batch;
  addressLine: string;
  city: string;
  state: string;
  //zipcode: string;
  zip: string;
  addressSupported: boolean = null;
  constructor(private modalService :BsModalService, 
    private userService: UserService, private batchService:BatchService ) { }
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
      'isDriver': new FormControl(null, Validators.required),
      'firstname': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern(/^[A-Za-z]+$/)]),//, ValidationService.stringValidator
      'lastname': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern(/^[A-Za-z]+$/)]),//, ValidationService.stringValidator
      //email optional (RFC 2822 compliant) regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      'email': new FormControl('', [Validators.required, Validators.email]),
      //phonenumber regex (Valid formats: [(123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725]).
      'phonenumber': new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]),
      'batch': new FormControl('', Validators.required),
      //Address is validated by autocompletion. The field values are readonly- inserted into by the autocomplete field.
      //Only the required field is needed to ensure that autocomplete is used.
      'address': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'zip': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      'username': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      'password': new FormControl('', Validators.required)
    })
  }
  /** SETDRIVER()
    This method is invoked by the buttons of the button group at the top of the form template.
    The 'driver' button sends a boolean variable of true if the 'isDriver' field is false or null.
    The 'rider' button sends a boolean variable of false if the 'isDriver' field is true or null.*/
  setDriver(x: boolean) {
    if(!this.signUpForm.value.isDriver || this.signUpForm.value.isDriver == null) {
      this.signUpForm.controls['isDriver'].setValue(x);
    }else if(this.signUpForm.value.isDriver || this.signUpForm.value.isDriver == null) {
      this.signUpForm.controls['isDriver'].setValue(x);
    }
  }
  /** SETBATCH()
    This method is invoked once upon initialization to fetch the list of active batches from the 
    database and make them available to the form. The BATCHES array is used to generate the batch 
    input field's select element with option elements.*/
  setBatch() {
    let batchField = <HTMLInputElement>document.getElementById('batch');
    let batchSplit = batchField.value.split(": ", 2);
    this.batchService.getBatchById(batchSplit[0]).subscribe((response)=>{
        this.batch = response;
        console.log(this.batch);
      })
  }
  /** HANDLEUSERNAMECHANGE()
    This method is invoked when the username input field is changed. It activates AJAX requests 
    that check if the username that the user has entered already exists in the database.*/
  handleUsernameChange() {
    //TODO: Write a method that uses AJAX to check if the username added is already existing.
  }
  /** GETGOOGLEPLACE() <== THIS IS AN ALTERNATIVE IMPLEMENTATION OF GETGOOGLEPLACEEVENT(), IMPLEMENT IN THE CASE THAT CERTAIN ADDRESSES ARE FOUND THAT 
   *                        <== DO NOT DISPLAY CORRECTLY VIA RYAN'S IMPLEMENTATION, WHICH UTILIZES THE MUCH MORE DETAILED ADDRESS_COMPONENTS ARRAY.
    This method is called on an event emission from the google-place component. It passes us a 
    reference of the 'place' object created within the component's Autocomplete class field, 
    provided by Google.*/
  /*getGooglePlace(place) {
    if(place.formatted_address == 'undefined') {
      console.log("The place object is: ");
      console.log(place);
    }else {
      console.log(place);
      let addressCity = place.formatted_address.split(', ', 4);
      let stateZip = addressCity[2].split(' ', 2);
      //ADDRESS && CITY
      console.log("ADDRESS = " + addressCity[0]);
      this.addressLine = addressCity[0];
      console.log("CITY = " + addressCity[1]);
      this.city = addressCity[1];
      //STATE && ZIPCODE
      console.log("STATE = " + stateZip[0]);
      this.state = stateZip[0];
      console.log("ZIPCODE = " + stateZip[1]);
      this.zipcode = stateZip[1];
    }
  }*/
  /** GETGOOGLEPLACE()
    This method is called on an event emission from the google-place component. It passes us a 
    reference of the 'place' object created within the component's Autocomplete class field, 
    provided by Google.*/
    getGooglePlace(place) {
      console.log(place)
      let arrLength = place.address_components.length;
      let statePlaceholder: string;
      console.log("array length = " + arrLength);
      if(arrLength == 7) {
        console.log("Street: " + place.address_components[0].long_name + " " + place.address_components[1].long_name);
        console.log("City: " + place.address_components[2].long_name);
        console.log("State: " + place.address_components[4].short_name);
        console.log("Zip: " + place.address_components[6].long_name);
        this.signUpForm.controls['address'].setValue(place.address_components[0].long_name + " " + place.address_components[1].long_name);
        this.signUpForm.controls['city'].setValue(place.address_components[2].long_name);
        this.signUpForm.controls['state'].setValue(place.address_components[4].short_name);
        this.signUpForm.controls['zip'].setValue(place.address_components[6].long_name);  
      }
      else if(arrLength == 8) {
        statePlaceholder = place.address_components[5].short_name;
        if(statePlaceholder.match('US')) {
          this.signUpForm.controls['state'].setValue(place.address_components[4].short_name);
          this.signUpForm.controls['zip'].setValue(place.address_components[6].long_name);
        }else {
          this.signUpForm.controls['state'].setValue(place.address_components[5].short_name);
          this.signUpForm.controls['zip'].setValue(place.address_components[7].long_name);
        }
        this.signUpForm.controls['address'].setValue(place.address_components[0].long_name + " " + place.address_components[1].long_name);
        this.signUpForm.controls['city'].setValue(place.address_components[2].long_name);
        console.log("Street: " + place.address_components[0].long_name + " " + place.address_components[1].long_name);
        console.log("City: " + this.signUpForm.value.city);
        console.log("stateplaceholder: " + statePlaceholder);
        console.log("State: " + this.signUpForm.value.state);
        console.log("Zip: " + this.signUpForm.value.zip);
      }
      else if(arrLength == 9) {
        console.log("Street: " + place.address_components[0].long_name + " " + place.address_components[1].long_name);
        console.log("City: " + place.address_components[2].long_name);
        console.log("State: " + place.address_components[5].short_name);
        console.log("Zip: " + place.address_components[7].long_name);
        this.signUpForm.controls['address'].setValue(place.address_components[0].long_name + " " + place.address_components[1].long_name);
        this.signUpForm.controls['city'].setValue(place.address_components[2].long_name);
        this.signUpForm.controls['state'].setValue(place.address_components[5].short_name);
        this.signUpForm.controls['zip'].setValue(place.address_components[7].long_name);
      }else {
        this.addressSupported = false;
        console.log("THIS ADDRESS IS NOT SUPPORTED.");
        return;
      }
      this.addressSupported = true;
      console.log("THIS ADDRESS IS SUPPORTED.");
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
      console.log("    User is a driver? = " + this.signUpForm.value.isDriver + ";");
      console.log("    Batch number = " + this.batch.batchNumber + ";  Batch location = " + this.batch.batchLocation + ";");
      console.log("    The this.signUpForm.status value is: " + this.signUpForm.status + ";");
      console.log("    This evaluates to: " + Boolean(this.signUpForm.status == "INVALID") + ";");
      console.log("    The form to be submitted is as follows:");
      console.log(this.signUpForm);
    }
    /** PREPAREMODELS()
      This method creates the required objects for the http request that registers a new user. It 
      then populates them with the values generated by this component/template.*/
    prepareModels() {
      //Instantiate a User object.
      this.user = new User();
      //Populate User object with validated data.
      this.user.batch = this.batch;
      this.user.driver = this.signUpForm.value.isDriver;
      this.user.firstName = this.signUpForm.value.firstname;
      this.user.lastName = this.signUpForm.value.lastname;
      this.user.email = this.signUpForm.value.email;
      this.user.phoneNumber = this.signUpForm.value.phonenumber;
      //HOME ADDRESS
      this.user.hAddress = this.signUpForm.value.address;
      this.user.hCity = this.signUpForm.value.city;
      this.user.hState = this.signUpForm.value.state;
      this.user.hZip = Number(this.signUpForm.value.zip);
      //WORK ADDRESS
      this.user.wAddress = this.batch.bAddress;
      this.user.wCity = this.batch.bCity;
      this.user.wState = this.batch.bState;
      this.user.wZip = Number(this.batch.bZip);
      this.user.userName = this.signUpForm.value.username;
      //NOTE: WE CANNOT PASS THE PASSWORD BECAUSE IT DOESNT EXIST IN THE SPRING USER MODEL.
      //NOTE: YOU CANNOT CREATE A NEW MODEL OR CHANGE USER WITHOUT REFACTORING THROUGH A RABBIT HOLE.
      //  THE BACKEND IS EXPECTING A SPECIFIC OBJECT WITH SPECIFIC PARAMETERS.
      //  USER MODEL IS ALSO A DEPENDENCY OF OTHER COMPONENTS IN THE FRONTEND, SO DON'T ADD A PARAMETERIZED CONSTRUCTOR.
      console.log("    Prepared the user object as follows:");
      console.log(this.user);
    }
    /** SENDFORMHTTPPOST()
      This method uses the injected UserService to send an http post containing the User object. This method 
      has no parameters because the User object is available to the component and the service is injected.*/
    sendFormHttpPost() {
      this.userService.addUser(this.user).subscribe(res =>{
        console.log(res)
        this.modalRef.hide();
        alert("Registration was successful!");
      }, error=>{
        console.log(error)
      })
      sessionStorage.clear();
    }
    /** FLUSHDATA()
      This method destroys all created objects and resets the form to a pristine condition. It should be invoked at 
      the ass-end of the ONSUBMIT method, after the http post for a new user succeeds.*/
    flushData() {
      console.log("    Flushing data...");
      this.addressLine = null;
      this.city = null;
      this.state = null;
      this.zip = null;
      this.batch = null;
      this.user = null;
      this.signUpForm.reset();
      console.log("    batch object follows:");
      console.log(this.batch);
      console.log("    user object follows:");
      console.log(this.user);
      console.log("    signUpForm object follows:");
      console.log(this.signUpForm);
    }
  }