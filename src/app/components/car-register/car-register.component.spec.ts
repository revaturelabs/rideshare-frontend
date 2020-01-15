import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegisterComponent } from './car-register.component';
import { AdminComponent } from '../admin/admin.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { DriverComponent } from '../driver/driver.component';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';

describe('CarRegisterComponent', () => {
  let component: CarRegisterComponent;
  let fixture: ComponentFixture<CarRegisterComponent>;
  let carService: CarService;


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
    imports: [HttpClientModule, AppRoutingModule, FormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRegisterComponent);
    component = fixture.componentInstance;
    component.years = [2010,2012,2016,2029];
    component.userId = 1;
    component.car = (
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
  });
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('should add car', () => {
  //   component.validationService.validateSeats(4);
  //   carService.createCar( 
    //   {
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
    // }   
//  this.car , this.userId);
//   });
});
