import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AdminComponent, CarRegisterComponent, UserRegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
    imports: [AppRoutingModule, FormsModule, HttpClientModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  }));
   let service: AuthService;
   
  beforeEach(() => {
    service = TestBed.get(AuthService);
    service.loggedIn = false;
  });

  it('should be created', () => {
    // const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('#isLoggedIn() should confirm if logged in', () => {
    // const isLoggedIn = false;
    service.loggedIn = false;
    expect(service.loggedIn).toBe(false);
  })
});
