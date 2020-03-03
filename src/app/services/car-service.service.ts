import { Injectable } from '@angular/core';
import {Car} from '../Models/Car';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private http:HttpClient) { }

  getCarById(car_id:number):Promise<Car>{

    return this.http.get<Car>(`http://localhost:9999/cars/${car_id}`).toPromise();
  }

  getCarByEmployeeId(employee_id:number):Promise<Car>{

    return this.http.get<Car>(`http://localhost:9999/cars/cars/${employee_id}`).toPromise();
  }

  getAllCars():Promise<Car[]>{

    return this.http.get<Car[]>(`http://localhost:9999/cars`).toPromise();
  }

  addCar(car:Car):Promise<Car>{
   
    return this.http.post<Car>(`http://localhost:9999/cars`,car).toPromise();
  }

  deleteCar(car_id:number):Promise<any>{

    return this.http.delete<any>(`http://localhost:9999/cars/${car_id}`).toPromise();

  }

  updateCar(car:Car):Promise<Car>{

    return this.http.put<Car>(`http://localhost:9999/cars`,car).toPromise();

  }

}
