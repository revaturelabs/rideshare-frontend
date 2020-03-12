import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../../services/car-service.service';
import { Car } from '../../models/car';
import { EmployeeServiceService } from '../../services/employee-service.service';
import { Employee } from '../../models/employee';
import { ConfigServiceService } from '../../services/config-service.service';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  
  success :string;
  userId: number;
  hasCar: boolean = false;

  employee : Employee;
  car : Car = new Car(0,"", "", "", 1, 2000, this.employee);
  make : string;
  model : string;
  color : string;
  year : number;
  seats : number;

  constructor(private carService: CarServiceService, private employeeService:EmployeeServiceService, private configService: ConfigServiceService) { }

  ngOnInit() {
    // this.userId = +sessionStorage.getItem("userid");
    // this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
    //   if(response != null){ 
    //     this.currentCar = response;
    //     this.color = response.color;
    //     this.year = response.year;
    //     this.make = response.make;
    //     this.model = response.model;
    //     this.nrSeats = response.seats;
    //     this.hasCar = true;
    //   }
    // });

    this.employee = JSON.parse(sessionStorage.getItem('User'));
    console.log(this.employee);
    this.GetCarByEmployeeId(this.employee.employee_id);
  }

  async GetCarByEmployeeId(id:number){
    let c: any = await this.carService.getCarByEmployeeId(id)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      this.car = onfulfilled;
      this.make = this.car.make;
      this.model = this.car.model;
      this.color = this.car.color;
      this.year = this.car.car_year;
      this.seats = this.car.available_seats;
      console.log(this.car);
      return onfulfilled;
    })
    .catch(error =>{
      console.log("");
    })
    console.log(c);
  }

  async UpdateCarInfo(){
    this.car = new Car(this.car.car_id, this.color, this.make, this.model, this.seats, this.year, this.employee);

    let updated: Car = await this.carService.updateCar(this.car)
    .then((onfulfilled) => {
      this.car = onfulfilled;
      console.log(this.car);
      return onfulfilled;
    })

    this.UpdateContactInfo();
  }

  async UpdateContactInfo(){
    let employee : Employee = new Employee(this.employee.employee_id, this.employee.email, this.employee.first_name, this.employee.last_name,
      this.employee.phone_number, this.employee.username, this.employee.password, this.employee.user_address, this.employee.is_accepting_rides,
      this.employee.is_active, true, this.employee.is_manager, this.employee.office);

    let updated: Employee = await this.employeeService.updateEmployee(employee)
    .then((onfulfilled) => {
      this.employee = onfulfilled;
      console.log(this.employee);
      return onfulfilled;
    })

    sessionStorage.setItem('User',JSON.stringify(this.employee));
    this.employee = JSON.parse(sessionStorage.getItem('User'));
  }

}
