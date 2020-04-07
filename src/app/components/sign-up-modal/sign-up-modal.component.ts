import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  /*** To continue using the bootstrap css modal, we must keep this reference to it;
    ideally, we can create an alternative directive, but to mitigate the amount of
    refactoring we are undertaking for now, it's got to be kept.
  ***/
  modalRef :BsModalRef;
  
  constructor(private modalService :BsModalService) { }

  ngOnInit() {
    
  }

  /*** This is where we are using the modal reference, so that the modal appears when we click "Sign Up".
    The method 'openModal()' is called when the user clicks "Sign Up".
    It receives a reference to the template, '#template', which contains our FormGroup.
  ***/
  openModal(template :TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}