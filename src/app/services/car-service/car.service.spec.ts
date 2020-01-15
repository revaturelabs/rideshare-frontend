import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { DriverInfoComponent } from 'src/app/components/driver-info/driver-info.component';
import { DriverComponent } from 'src/app/components/driver/driver.component';

describe('CarService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
      declarations: 
      [AdminComponent, 
        CarRegisterComponent, 
        RegisterComponent, 
        LoginComponent, 
        MyCarComponent, 
        NavbarComponent, 
        PreferenceComponent, 
        ProfileComponent, 
        DriverInfoComponent, 
        DriverComponent
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  }));

  it('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });
});


  describe('CarService', () => {
    let carService: CarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: 
        [AdminComponent, 
          CarRegisterComponent, 
          RegisterComponent, 
          LoginComponent, 
          MyCarComponent, 
          NavbarComponent, 
          PreferenceComponent, 
          ProfileComponent, 
          DriverInfoComponent, 
          DriverComponent
        ],
        imports: [HttpClientModule, AppRoutingModule, FormsModule],
        providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]      
      });

    carService = TestBed.get(CarService);
  });

  it('should create car', () => {
    expect(carService).toBeTruthy();
  });


  //Adding test for getAllCars() method
  describe('getAllCars', () => {
    it('should return a list of cars', () => {
    const carResponse = [
      {
      carId: 1,
      color: 'white',
      seats: 4,
      make: 'Toyota',
      model: 'Corolla',
      year: 2015,
        user: {
          userId: 1,
          userName: 'username',
        batch: {
          batchLocation: 'NYC',
          batchNumber: 123
        },
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@gmail.com',
        phoneNumber: '9171234567',
        active: true,
        driver: true,
        acceptingRides: true
      }
    },
      {
        carId: 2,
      color: 'bl',
      seats: 4,
      make: 'BMW',
      model: 'i8',
      year: 2018,
      user: {
        userId: 2,
        userName: 'username',
        batch: {
          batchLocation: 'VA',
          batchNumber: 456
        },
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@gmail.com',
        phoneNumber: '7031234567',
        active: true,
        driver: true,
        acceptingRides: true
      }
    }
    ];
    let response;
    spyOn(carService, 'getAllCars').and.returnValue(of(carResponse));

    carService.getAllCars().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(carResponse);
    });
  });
  });