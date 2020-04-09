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


  addressLine: string;
  city: string;
  state: string;

  options = {
    componentRestrictions : {
      country: ['US']
    }
  }



  constructor(private modalService :BsModalService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
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

  public handleAddressChange(address: any) {
    let addressVal = address.srcElement.value;
    
    let splitted = addressVal.split(", ", 3);
    
    this.addressLine = splitted[0];
    this.city = splitted[1];
    this.state = splitted[2];
    
    //Set the value of fields in address-related formControl items.
    console.log(this.signUpForm.value.address + " to " + this.addressLine);
    console.log(this.signUpForm.value.city + " to " + this.city);
    console.log(this.signUpForm.value.state + " to " + this.state);
    
    this.signUpForm.value.address = this.addressLine;
    this.signUpForm.value.city = this.city;
    this.signUpForm.value.state = this.state;

    console.log("now is: " + this.signUpForm.value.address);
    console.log("now is: " + this.signUpForm.value.city);
    console.log("now is: " + this.signUpForm.value.state);
    console.log(this.signUpForm);
  }

  onSubmit() {
    //Display and reset the form.
    console.log(this.signUpForm);
    console.log("This form is valid.");
    this.signUpForm.reset();
  }

}