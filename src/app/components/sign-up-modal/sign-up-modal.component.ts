import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';



/*** In this commit, I really only implemented the onSubmit method 
  (called by the submit button of the FormGroup) and a few basic 
  built-in validators.

  NOTE: We are not calling the methods in the constructors, we are
  simply passing a reference to the methods, which gives angular 
  access to them when the user tries to submit the forms.
  
  TLDR: IF YOU WANT TO ADD A VALIDATOR, IT WONT WORK IF YOU CALL THE 
  METHOD DIRECTLY.
 ***/



@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  signUpForm: FormGroup;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REMEMBER: This is the reference to the form.
  modalRef :BsModalRef;
  
  constructor(private modalService :BsModalService) { }

  /*** Check out the object that is emitted int hte web console if you want 
    to see how this is a big step forward.

    Notice that the 'controls' attribute of the object contains many details
    about the submitted form that is being created programmatically. It's 
    much more detailed than the template driven approach, and whatever the 
    hell we were working with before.
   ***/
  ngOnInit() {
    this.signUpForm = new FormGroup({
      //Remember that the first parameter to this constructor is the default 
      //value. It could be anything, I've only set it to null here. Also 
      //remmeber that we can add as many validators as we please, including 
      //those which we create ourselves.
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

  //NOTE: We can access the signUpForm from any method because it is a 
  //declared reference in this component. Angular is basically taking care 
  //of the form input and validation for us, we just have to implement and configure.
  onSubmit() {
    console.log(this.signUpForm);
  }

}