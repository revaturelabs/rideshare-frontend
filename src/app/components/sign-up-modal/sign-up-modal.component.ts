import { Component, OnInit, TemplateRef,Renderer2, Inject} from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { DOCUMENT } from '@angular/common';
import { ValidationService } from '../../validation.service';

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

  submitted = false;
  signUpForm: FormGroup;
  modalRef :BsModalRef;

   //Here is where we are storing our collected ADDRESSLINE, CITY, and STATE
  //from the address object emitted by 
  addressLine: string;
  city: string;
  state: string;


  options = {
    componentRestrictions : {
      country: ['US']
    }
  }

  constructor(private modalService :BsModalService, private googleApi:GoogleApiService,  private renderer2: Renderer2,@Inject(DOCUMENT) private _document: Document, private formBuilder: FormBuilder ) { }

  ngOnInit() {
  

  //   const s = this.renderer2.createElement('script');
  //   s.type = 'text/javascript';
  // s.src = 'https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'&libraries=places&language=en';
  //   s.text = ``;
  //   this.renderer2.appendChild(this._document.body, s);
   
  //   this.signUpForm = this.formBuilder.group({
  //     'firstname': ['',[ 
  //       Validators.required,
  //       Validators.minLength(5),
  //       Validators.maxLength(35), 
  //       ValidationService.stringValidator
  //     ]],
  //     'lastname':['', [
  //       Validators.required,
  //       Validators.minLength(5),
  //       Validators.maxLength(35), 
  //       ValidationService.stringValidator
  //     ]],
  //     'email': ['',[
  //       Validators.required,
  //       ValidationService.emailValidator  
  //     ]],
  //     'phonenumber': ['',[
  //       Validators.required,
  //       Validators.minLength(10) ,
  //       ValidationService.phoneNumberValidator
  //     ]],
  //     'batch': ['', Validators.required],
  //     'address': ['', Validators.required],
  //     'city': ['', Validators.required],
  //     'state': ['', Validators.required],
  //     'zipcode': ['', Validators.required],
  //     'username':['', Validators.required],
  //     'password': ['', Validators.required],
  //   })    
  // }
  this.signUpForm = new FormGroup({
    'firstname': new FormControl('', [Validators.required,Validators.minLength(2),
            Validators.maxLength(35), 
            ValidationService.stringValidator]),
    'lastname': new FormControl('', [Validators.required,Validators.minLength(5),
            Validators.maxLength(35), 
            ValidationService.stringValidator]),
    'email': new FormControl('', [Validators.required,ValidationService.emailValidator]),
    'phonenumber': new FormControl('', [Validators.required,ValidationService.phoneNumberValidator,Validators.minLength(10) ]),
    'batch': new FormControl('', [Validators.required,Validators.maxLength(3)]),

    //to be addressed *budump-ts 
    'address': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
   'state': new FormControl('', Validators.required),
    'zipcode': new FormControl('', Validators.required),
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })    
}

  // get f() { return this.signUpForm.controls; }

  openModal(template :TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /*** The handleAddressChange method is receiving the fleeting object of 
    type "changes" (some kind of google crap which I currently couldn't 
    care less about).
    When I examined the object as JSON in the console, I found (among 
    the vast amount of data about our webpage that it collected) this 
    srcElement's value field is the only pertinent data we can collect 
    and use. ***/
  public handleAddressChange(address: any) {
    //The 'address.formattedAddress' is referenced directly from the 
    //Google places API.
    //You can see that we are setting our own variable 'formattedAddress' 
    //equal to the value of the API's formattedAddress.    
//Capture the address source element value in a string.
    let addressVal = address.srcElement.value;
    
    //Split the string by comma followed by whitespace up to three times.
    //Capture the resulting strings in SPLITTED string array.
    let splitted = addressVal.split(", ", 3);
    
    //Capture the ADDRESSLINE in a variable.
    this.addressLine = splitted[0];
    //Capture the CITY in a variable.
    this.city = splitted[1];
    //Capture the STATE in a variable.
    this.state = splitted[2];
  }

  onSubmit() {
    // this.submitted = true;
    console.log("welcome!"+this.signUpForm.value.firstname);
        // stop here if form is invalid
        // if (this.signUpForm.invalid) {
        //     return;
        // }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpForm.value, null, 4));
    
  }

}