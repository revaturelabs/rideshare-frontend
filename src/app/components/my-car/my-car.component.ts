import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-car',
  templateUrl: './my-car.component.html',
  styleUrls: ['./my-car.component.css']
})
export class MyCarComponent implements OnInit {

  userId: number;
  myCar: Car = new Car(); 

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit() {
    this.userId = Number(sessionStorage.getItem('auth'));
    if (!this.userId) {
      this.router.navigate(['']);
    } else {
      this.carService.getCarByUserId(this.userId).then((response)=>{
        if (response) {
          this.myCar = response;
          console.log(response)
        }
      })
    }
  }

  updateMyCar() {
    console.log('Update!');
  }

  removeMyCar() {
    if (window.confirm('Remove The Car')) {
      console.log('Remove!');
      this.myCar = new Car();
    }
  }
}
