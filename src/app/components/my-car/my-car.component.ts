import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-my-car',
  templateUrl: './my-car.component.html',
  styleUrls: ['./my-car.component.css']
})
export class MyCarComponent implements OnInit {

  userId: number;
  myCar: Car = new Car();

  constructor(private carService: CarService, private router: Router, private userService: UserService, private logService: LogService) { }

  ngOnInit() {
    this.userId = Number(sessionStorage.getItem('auth'));
    if (!this.userId) {
      this.router.navigate(['']);
    } else {
      this.carService.getCarByUserId(this.userId).then((response)=>{
        if (response) {
          this.myCar = response;
        }
      })
    }
  }

  removeMyCar() {
    if (window.confirm('The Car Will Be Removed')) {
      this.carService.removeCar(this.myCar.carId).subscribe(
        Response => {
        this.logService.info("updated user info: " + '\n' + JSON.stringify(Response));  
      }, error => {
        this.logService.error(error)
      })

      this.myCar = new Car();
      this.userService.updateIsDriver(false, this.userId);
    }
  }
}
