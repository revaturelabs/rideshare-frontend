import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { ConfigServiceService } from 'src/app/services/config-service.service';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { OfficeServiceService } from 'src/app/services/office-service.service';
import { Office } from 'src/app/models/office';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  employee : Employee;
  offices : Array<Office> = [];
  officeCities : Array<string> = [];
  cityOffices : Array<Office> = [];
  selectCity : string = " Select a City ";
  office : string = " Select an Office ";
  officeObject : Office;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  eStreet : string;
  eCity : string;
  eState : string;
  eZipcode : string;
  oStreet : string;
  oCity : string;
  oState : string;
  oZipcode : string;
  citySelected : boolean = false;
  officeSelected : boolean = false;


  constructor(private officeService : OfficeServiceService, private employeeService : EmployeeServiceService, private configService:ConfigServiceService) { }

  ngOnInit() {
  //  this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
  //     this.currentUser = response;

  //     this.hZipcode = response.hZip;
  //     this.hCity = response.hCity;
  //     this.hAddress = response.hAddress;
  //     this.hState = response.hState;

  //     this.wZipCode = response.wZip;
  //     this.wCity = response.wCity;
  //     this.wAddress = response.wAddress;
  //     this.wState = response.wState;
  //   });

    this.employee = JSON.parse(sessionStorage.getItem('User'));
    let address1 : Array<string> = this.employee.user_address.split(", ");
    this.eStreet = address1[0];
    console.log(this.eStreet);
    this.eCity = address1[1];
    address1 = address1[2].split(" ");
    this.eState = address1[0];
    this.eZipcode = address1[1];
    
    let address2 : Array<string> = this.employee.office.office_address.split(", ");
    this.oStreet = address2[0];
    console.log(this.oStreet);
    this.oCity = address2[1];
    address2 = address2[2].split(" ");
    this.oState = address2[0];
    this.oZipcode = address2[1];

    this.GetAllOffices();
  }

  GetAllCityOffices(){
    this.cityOffices = [];
    for(let i = 0; i < this.offices.length; i++){
      if(this.offices[i].office_address.includes(this.selectCity)){
        this.cityOffices.push(this.offices[i]);
      }
    }
    this.citySelected = true;
    this.office = " Select an Office ";
    this.officeSelected = false;
    console.log(this.cityOffices);
  }

  updateOffice(){
    console.log(this.office);
    for(let i = 0; i < this.cityOffices.length; i++){
      if(this.office == this.cityOffices[i].office_address){
        this.officeObject = this.cityOffices[i];
      }
    }
    this.officeSelected = true;
    console.log(this.officeObject);
  }

  async GetAllOffices(){
    let o: Array<Office> = await this.officeService.getAllOffices()
    .then((onfulfilled) => {
      this.offices = onfulfilled;
      console.log(this.offices);
      //for future batches, this whole mess below can be avoided by either seperating address into street, city, state and zip
        //or just making a new column and giving each office a name
      for(let i = 0; i < this.offices.length; i++){
        let counter = 0;
        let city : string = this.offices[i].office_address.split(", ")[1];
        for(let j = 0; j < this.officeCities.length; j++){
          if(this.officeCities[j] == city){
            counter++;
            break;
          }
        }
        if(counter == 0){
          this.officeCities.push(city);
        }
      }
      console.log(this.officeCities);
      return onfulfilled;
    })
  }

  async UpdateContactInfo(){
    let address : string = this.eStreet + ", " + this.eCity + ", " + this.eState + " " + this.eZipcode; 
    console.log(address);
    let employee : Employee = new Employee(this.employee.employee_id, this.employee.email, this.employee.first_name, this.employee.last_name,
      this.employee.phone_number, this.employee.username, this.employee.password, address, this.employee.is_accepting_rides,
      this.employee.is_active, this.employee.isDriver, this.employee.is_manager, this.officeObject);

    let updated: Employee = await this.employeeService.updateEmployee(employee)
    .then((onfulfilled) => {
      this.employee = onfulfilled;
      console.log(this.employee);
      return onfulfilled;
    })

    sessionStorage.setItem('User',JSON.stringify(this.employee));
    this.employee = JSON.parse(sessionStorage.getItem('User'));
    let address2 : Array<string> = this.employee.office.office_address.split(", ");
    this.oStreet = address2[0];
    console.log(this.oStreet);
    this.oCity = address2[1];
    address2 = address2[2].split(" ");
    this.oState = address2[0];
    this.oZipcode = address2[1];
  }
}
