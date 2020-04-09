import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Batch } from 'src/app/models/batch';
import { Registration } from 'src/app/models/registration';



/*** I've got this fragile piece of shit to the point where if you are careful, 
  you may create a consumable/transferable registration object upon submitting.
  There are comments in the FormGroup code below that show how to finish off the 
  validation.
  Other than that, the batch select element in the template needs to be completed.
 ***/



@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  //FormGroup and bootstrap css modal.
  signUpForm: FormGroup;
  modalRef :BsModalRef;
  //Imported models to assemble a User.
  batch: Batch;
  registration: Registration;
  //Non-FormGroup form items.
  isDriver: boolean = null;
  addressLine: string;
  city: string;
  state: string;
  //Google places autocomplete options.
  options = {
    componentRestrictions : {
      country: ['US']
    }
  }



  constructor(private modalService :BsModalService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      /*** NEED TO CREATE VALIDATOR WHICH CHECKS DATABASE FOR EXISTING username AND email AND ADD IT TO THE 
        APPROPRIATE CONTROLS.
       ***/
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phonenumber': new FormControl(null, Validators.required),
      'batch': new FormControl(null),//need custom validator: valid if(this.isDriver != null).
      'address': new FormControl(null),//paste the city validator (from one line down) here.
      'city': new FormControl(null),//need custom validator: valid if(this.city != null && this.city != "").
      'state': new FormControl(null),//paste the city validator (from the line above) here.
      'zipcode': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  openModal(template :TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  setDriver(){
    if(!this.isDriver){
      this.isDriver=true;
      console.log("Registerer is a driver.");
    }
  }
  setRider(){
    if(this.isDriver){
      this.isDriver=false;
      console.log("Registerer is a rider.");
    }
  }

  public handleAddressChange(address: any) {
    let splitted = (address.srcElement.value).split(", ", 3);
    this.addressLine = splitted[0];
    this.city = splitted[1];
    this.state = splitted[2];
  }

  onSubmit() {
    //(TESTING)Log the FormGroup.
    console.log(this.signUpForm);
    //Prepare the Batch model to inject into the Registration model.
    this.batch = new Batch(
      this.signUpForm.value.batch, 
      this.signUpForm.value.batch);
    //Prepare the Registration.
    this.registration = new Registration(
      this.batch,
      this.isDriver,
      this.signUpForm.value.firstname,
      this.signUpForm.value.lastname,
      this.signUpForm.value.email,
      this.signUpForm.value.phonenumber,
      this.addressLine,
      this.city,
      this.state,
      this.signUpForm.value.zipcode,
      this.signUpForm.value.username,
      this.signUpForm.value.password
    );
    //(TESTING)Log the Registration model.
    console.log(this.registration);
    
    //WE MUST SEND THE this.registration OBJECT IN AN HTTP REQUEST TO THE BACKEND HERE.

    //Reset the address strings.
    this.addressLine = null;
    this.city = null;
    this.state = null;
    //Reset the form.
    this.signUpForm.reset();
    //Free the models.
    this.registration = null;
    this.batch = null;
  }

}