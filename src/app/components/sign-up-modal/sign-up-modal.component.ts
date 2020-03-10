import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
// import { UserService } from 'src/app/services/user-service/user.service';
// import { User } from 'src/app/models/user';
// import { Batch } from 'src/app/models/batch';
// import { BatchService } from 'src/app/services/batch-service/batch.service';
// import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Office } from '../../models/office';
import { Employee } from '../../models/employee';
import { EmployeeServiceService } from '../../services/employee-service.service';
import { OfficeServiceService } from '../../services/office-service.service';
import { Router } from '@angular/router';
import { ConfigServiceService } from '../../services/config-service.service';

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
  offices: Array<Office> = [];
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
  states = ['AK','AL','AR','AZ','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS',
            'KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY',
            'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WI','WV','WY'];
  constructor(private modalService :BsModalService, private es :EmployeeServiceService, private os :OfficeServiceService, private cs:ConfigServiceService,private r : Router) { }

  ngOnInit() {
    this.getAllOffices();
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
    let verstat = veri.is_valid;
    console.log(this.phone.length);
    let u=await this.es.getEmployeeByUsername(this.username);
    console.log(u);
    if(u != null){
      alert("Username already exist!");
      console.log("user already exist");
    }
    if(this.phone.length != 10){
      this.phoneNumberError = "Invalid phone number!";
    }

    else if(verstat) {
      try {
        let e:Employee =await this.es.addEmployee(empl);
        this.modalRef.hide();
        this.r.navigateByUrl("/home");
      } catch(e) {
        console.log(e);
      }
    } else {
      alert("Address is not validated, User not created");
      console.log("address not real");
    }
    
    // this.showLogin = true;
    // this.showRegister = false;
  }

  changeLocation(event) {
    let option = event.target.options.selectedIndex;
    this.office = this.offices[option];
    console.log(this.office);
  }
  
  async getAllOffices() {
    let o: Array<Office> = await this.os.getAllOffices()
    .then((onfulfilled) =>{
      this.offices = onfulfilled;
      return onfulfilled;
    })
  }
}
