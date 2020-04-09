import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';



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

  options = {
    componentRestrictions : {
      country: ['US']
    }
  }




  //Here is where we are storing our collected ADDRESSLINE, CITY, and STATE
  //from the address object emitted by 
  addressLine: string;
  city: string;
  state: string;




  constructor(private modalService :BsModalService) { }

  ngOnInit() {
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

  /*** The handleAddressChange method is receiving the fleeting object of 
    type "changes" (some kind of google crap which I currently couldn't 
    care less about).
    When I examined the object as JSON in the console, I found (among 
    the vast amount of data about our webpage that it collected) this 
    srcElement's value field is the only pertinent data we can collect 
    and use. ***/
  public handleAddressChange(address: any) {
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
    console.log(this.signUpForm);
  }

}