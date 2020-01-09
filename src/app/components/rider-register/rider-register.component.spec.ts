import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderRegisterComponent } from './rider-register.component';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { DriverRegisterComponent } from '../driver-register/driver-register.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';

describe('RiderRegisterComponent', () => {
  let component: RiderRegisterComponent;
  let fixture: ComponentFixture<RiderRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, RiderRegisterComponent, LoginComponent, CarRegisterComponent, DriverRegisterComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
