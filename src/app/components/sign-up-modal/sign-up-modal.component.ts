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

  //This is where we are storing the address taken from the API.
  formattedAddress: string;

  //These options are not required, but they allow us to restrict the 
  //search to our preferences.
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

  //This method is called every time the change detection detects that 
  //the address input field has changed.
  public handleAddressChange(address: any) {
    //The 'address.formattedAddress' is referenced directly from the 
    //Google places API.
    //You can see that we are setting our own variable 'formattedAddress' 
    //equal to the value of the API's formattedAddress.
    this.formattedAddress = address.formattedAddress;


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