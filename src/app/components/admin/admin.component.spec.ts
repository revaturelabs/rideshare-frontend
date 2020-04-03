import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { LoginComponent } from '../login/login.component';
import { APP_BASE_HREF } from '@angular/common';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;

  beforeEach(async(() => {
    router = jasmine.createSpyObj('router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' },
      { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
