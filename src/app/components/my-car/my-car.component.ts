import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-my-car',
  templateUrl: './my-car.component.html',
  styleUrls: ['./my-car.component.css']
})
export class MyCarComponent implements OnInit {

  /**
   * Establishes userId as a number
   * Creates a myCar object
   */

  userId: number;
  myCar: Car = new Car();

  /**
   * This is a constructor
   * @param carService A car service
   * @param router A router
   * @param userService An user service
   * @param logService  A log service
   * @param authService An authorization service
   */
  constructor(private carService: CarService, private router: Router, private userService: UserService, private logService: LogService, private authService: AuthService) { }

  /**
   * This is OnInit functiion
   */
  ngOnInit() {
    this.userId = this.authService.user.userId;
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

  /**
   * A POST method that removes a car
   */

  removeMyCar() {
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
