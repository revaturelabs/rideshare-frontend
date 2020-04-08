import { Component, OnInit, TemplateRef,Renderer2, Inject} from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { DOCUMENT } from '@angular/common';


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

  signUpForm: FormGroup;
  modalRef :BsModalRef;
  apiKey;
  //This is where we are storing the address taken from the API.
  formattedAddress: string;

  //These options are not required, but they allow us to restrict the 
  //search to our preferences.
  options = {
    componentRestrictions : {
      country: ['US']
    }
  }

  constructor(private modalService :BsModalService, private googleApi:GoogleApiService,  private renderer2: Renderer2,@Inject(DOCUMENT) private _document: Document ) { }

  ngOnInit() {
  

  //   const s = this.renderer2.createElement('script');
  //   s.type = 'text/javascript';
  // s.src = 'https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'&libraries=places&language=en';
  //   s.text = ``;
  //   this.renderer2.appendChild(this._document.body, s);
   
    this.signUpForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phonenumber': new FormControl(null, Validators.required),
      'batch': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'zipcode': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })    
  }

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
    console.log(this.signUpForm);
  }

}