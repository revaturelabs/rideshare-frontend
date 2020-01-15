import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfoComponent } from './driver-info.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { DriverComponent } from '../driver/driver.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('DriverInfoComponent', () => {
  let component: DriverInfoComponent;
  let fixture: ComponentFixture<DriverInfoComponent>;

  beforeEach(async(() => {
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
      imports: 
      [HttpClientModule, 
        AppRoutingModule, 
        FormsModule
      ],
      providers: 
      [{provide: APP_BASE_HREF, useValue: '/my/app'}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInfoComponent);
    component = fixture.componentInstance;
    component.allAvailableCars = [{
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
    }];
    component.availableCars = [{
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
    }}
    ];
    component.orderYear = false;
    component.orderFirstName = false;
    component.searchName = '';
    component.searchLocation = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show all drivers', () => {
  //   //arrange
  //   component.searchName = '';
  //   component.searchLocation = '';
  //   // component.orderByLocation();
  //   //act
  //   component.showAllDrivers();
  //   //assert
  //   expect(component.searchName).toEqual('');
  //   expect(component.searchLocation).toEqual('');
  //   expect(component.orderByLocation()).toContain([{
  //     carId: 1,
  //   color: 'white',
  //   seats: 4,
  //   make: 'Toyota',
  //   model: 'Corolla',
  //   year: 2015,
  //   user: {
  //     userId: 1,
  //     userName: 'username',
  //     batch: {
  //       batchLocation: 'NYC',
  //       batchNumber: 123
  //     },
  //     firstName: 'John',
  //     lastName: 'Smith',
  //     email: 'john.smith@gmail.com',
  //     phoneNumber: '9171234567',
  //     active: true,
  //     driver: true,
  //     acceptingRides: true
  //   }
  // }]);
  // });
});
