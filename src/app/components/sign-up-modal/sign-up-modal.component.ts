import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'signupmodal',
    templateUrl: './sign-up-modal.component.html',
    styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {

    // Store the retrieved template from the 'openModal' method for future use cases.
    modalRef: BsModalRef;

    constructor(private modalService: BsModalService) { }
    ngOnInit() {

    }

    // Opens 'sign up' modal that takes in a template of type 'ng-template'.
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
}
