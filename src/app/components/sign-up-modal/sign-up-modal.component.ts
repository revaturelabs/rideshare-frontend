import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Office } from 'src/app/models/office';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { OfficeServiceService } from 'src/app/services/office-service.service';
import { Router } from '@angular/router';
import { ConfigServiceService } from 'src/app/services/config-service.service';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  fname :string;
  lname :string;
  username :string;
  password : string;
  email :string;
  phone :string;
  street:string;
  city:string;
  state:string;
  zip:number;
  address :string;
  isDriver: boolean;
  checked: boolean;
  offices: Office;
  office: Office;

  // validation
  firstNameError :string;
  lastNameError :string;
  emailError :string;
  phoneNumberError :string;
  userNameError :string;
  hAddressError :string;
  hStateError :string;
  hCityError :string;
  hZipError :string;
  
  success :string;
  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef :BsModalRef;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  constructor(private modalService :BsModalService, private es :EmployeeServiceService, private os :OfficeServiceService, private cs:ConfigServiceService,private r : Router) { }

  ngOnInit() {
    this.checked = false;
    this.offices = JSON.parse(sessionStorage.getItem("offices"));
    console.log(this.offices);
    this.office = this.offices[0];
  }
  //Opens 'sign up' modal that takes in a template of type 'ng-template'.

  openModal(template :TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  async submit(){
    let uaddress= this.street + ", "+ this.city + ", " + this.state + " " + this.zip;
    let  empl:Employee = new Employee(0,this.email,this.fname,this.lname,this.phone,this.username,this.password,uaddress,true,true,this.checked,false,this.office);
    let veri = await this.cs.verifyAddress(this.state ,this.city, this.street, this.zip);
    console.log(veri);
    let verstat = veri;
    if(verstat) {
      try {
        let e:Employee =await this.es.addEmployee(empl);
        this.modalRef.hide();
        this.r.navigateByUrl("/home");
      } catch(e) {
        console.log(e);
      }
    } else {
      console.log("asdasd");
    }
    
    // this.showLogin = true;
    // this.showRegister = false;
  }

  changeLocation(event) {
    let option = event.target.options.selectedIndex;
    this.office = this.offices[option];
    console.log(this.office);
	}
}
