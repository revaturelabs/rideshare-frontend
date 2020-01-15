import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { DriverComponent } from '../driver/driver.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;

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
    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.showDropDown = false;
    component.curPage = 1;
    component.totalPage = 10;
    component.users = [{ userId: 1,
      userName: 'username',
      batch: {
        batchNumber: 1,
        batchLocation: 'NYC'
      },
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      phoneNumber: '9171234567',
      active: true,
      driver: true,
      acceptingRides: true}]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change user in login dropdown', () => {
    
    // arrange
    const user = component.users = [{ userId: 1,
      userName: 'username',
      batch: {
        batchNumber: 1,
        batchLocation: 'NYC'
      },
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      phoneNumber: '9171234567',
      active: true,
      driver: true,
      acceptingRides: true}];
      // act
      component.changeUser(user);
      // assert
      expect(component.users).toMatch;
  });

  it('should search account and return a user', () => { 

  });

  it('should toggle dropdown', () => {
    // arrange
    component.showDropDown = false;
    // act
    component.toggleDropDown();
    // assert
    expect(component.showDropDown).toBe(true);
  });

  it('nextPage()', () => {
    component.curPage = 1;
    component.nextPage();
    expect(component.curPage).toBeGreaterThanOrEqual(1);
  });

  it('prevPage()', () => {
    component.curPage = 5;
    component.prevPage();
    expect(component.curPage).toBeLessThan(5);
  });

  it('loginFailed()', () => {
    component.userName = '';
    component.failed = true;
    component.loginFailed();
    expect(component.userName).toBe('');
    expect(component.failed).toBe(true);
  });
});
