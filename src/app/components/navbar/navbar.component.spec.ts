import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { DriverProvider } from 'protractor/built/driverProviders';
import { DriverRegisterComponent } from '../driver-register/driver-register.component';
import { LoginComponent } from '../login/login.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { PreferenceComponent } from '../preference/preference.component';
import { RiderRegisterComponent } from '../rider-register/rider-register.component';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, AdminComponent, CarRegisterComponent, DriverRegisterComponent, LoginComponent, MyCarComponent, PreferenceComponent, ProfileComponent, RiderRegisterComponent ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
