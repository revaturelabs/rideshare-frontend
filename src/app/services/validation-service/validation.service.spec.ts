import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { DriverRegisterComponent } from 'src/app/components/driver-register/driver-register.component';
import { RiderRegisterComponent } from 'src/app/components/rider-register/rider-register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AdminComponent, CarRegisterComponent, DriverRegisterComponent, RiderRegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
     imports: [HttpClientModule, AppRoutingModule, FormsModule],
     providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  }));

  it('should be created', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    expect(service).toBeTruthy();
  });

  it('seats should not be null', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    expect()
  })

});
