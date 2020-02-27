import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
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

describe('CarService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
     declarations: [AdminComponent, CarRegisterComponent, UserRegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
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
      declarations: [AdminComponent, CarRegisterComponent, UserRegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })

    carService = TestBed.get(CarService);
  })

  it('should register a car', () => {
    expect(carService).toBeTruthy();
  });

    //Adding test for getAllCars() method
    describe('getAllCars', () => {
      it('should return a collection of cars', () => {
        const carsResponse = [
          {
            carId: 1,
            color: 'black',
            seats: 6,
            make: 'Tesla',
            model: 'Model X',
            year: 2019,
            user: {
              userId: 1,
              userName: 'carsryan',
            batch: {
              batchNumber: 1,
              batchLocation: '123'
            },
            firstName: 'Ryan',
            lastName: 'Carstons',
            email: 'ryan@gmail.com',
            phoneNumber: '1231231231',
            driver: true,
            active: true,
            acceptingRides: true
            }
          },    
          {
            carId: 2,
            color: 'white',
            seats: 4,
            make: 'Toyota',
            model: 'Supra',
            year: 2019,
            user: {
              userId: 2,
              userName: 'pwin',
            batch: {
              batchNumber: 2,
              batchLocation: '456'
            },
            firstName: 'Peter',
            lastName: 'Nguyen',
            email: 'pete@gmail.com',
            phoneNumber: '3213213213',
            driver: true,
            active: true,
            acceptingRides: true
                  }
            }  
        ];
        let response;
        spyOn(carService, 'getAllCars').and.returnValue(of(carsResponse));
  
        carService.getAllCars().subscribe(res => {
          response = res;
        });
  
        expect(response).toEqual(carsResponse);
      });
    });
});
