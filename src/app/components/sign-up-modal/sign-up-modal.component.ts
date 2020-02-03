import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  fname :string;
  lname :string;
  email :string;
  password :string;
  address :string;
  city :string;
  state :string;
  zipcode :number;
  accountType :string;

  user :User = new User();

  // validation
  firstNameError :string;
  lastNameError :string;
  emailError :string;

  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef :BsModalRef;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  constructor(private modalService :BsModalService, private userService :UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        console.log(res);
      }
    );
  }
  //Opens 'sign up' modal that takes in a template of type 'ng-template'.

  openModal(template :TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  submitUser() {
    this.user.phoneNumber = "7872222222";
    this.user.userName = "beans";
    this.user.userId = 0;
    this.user.batch = {batchNumber: 1911, batchLocation: "Morgantown"};
 
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        if(res.firstName != undefined){
          this.firstNameError = res.firstName[0];
        }
        if(res.lastName != undefined){
          this.lastNameError = res.lastName[0];
        }
        if(res.email != undefined){
          this.emailError = res.email[0];
        }
      }, 
      res => {
        console.log("failed to add user");
        console.log(res);
      }
    );
  }
  
}
