import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';



/*** Other than the changes in the template, I imported ReactiveFormsModule into the 
  app module, then imported FormGroup and FormControl here in this component.
  I've also implemented the synchronization with the template items below.

  NOTE: I will have to look up how to approach the button group for the radio input
  field. To do this, I can check out what I did in my project II; otherwise, we will
  need to change the absolutely beautiful, timeless button group formatting to normal
  bootstrap styling.. what a fucking tragedy that would be...

  For now, the button group is not included in the controls.
***/



@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  //This 'signUpForm' will be the reference to our reactive form.
  signUpForm: FormGroup;
  modalRef :BsModalRef;
  
  constructor(private modalService :BsModalService) { }

  ngOnInit() {
    //This will be where we configure the form controls.
    this.signUpForm = new FormGroup({
      //Here, we will add any and all FormControls (AKA. inputs) that exist within our FormGroup (AKA. form).
      //They should be identified by their 'formControlName' attributes that we set in the template like this:
      'firstname': new FormControl(null),
      'lastname': new FormControl(null),
      'email': new FormControl(null),
      'phonenumber': new FormControl(null),
      'batch': new FormControl(null),
      'address': new FormControl(null),
      'city': new FormControl(null),
      'state': new FormControl(null),
      'zipcode': new FormControl(null),
      'username': new FormControl(null),
      'password': new FormControl(null)
      //I hope that these match whatever model we will be using to stringify/parse for sending off the form...
      //With this implementation, we can add arrays of validators/conditions if we like, including custom ones.
      //The constructor's first parameter is the default value, so I just set it to null for now.
    })    
  }

  openModal(template :TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}