import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Batch } from 'src/app/models/batch';
import { User } from 'src/app/models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, UserRegisterComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent, AdminComponent, CarRegisterComponent],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, RouterTestingModule,],
      schemas: [NO_ERRORS_SCHEMA],
      //imports: [HttpClientModule, AppRoutingModule, FormsModule],
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
    let user: User;
    component.users = [user]
    // fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  
});
