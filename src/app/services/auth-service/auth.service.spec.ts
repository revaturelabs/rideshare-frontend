import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { DriverRegisterComponent } from 'src/app/components/driver-register/driver-register.component';
import { RiderRegisterComponent } from 'src/app/components/rider-register/rider-register.component';
import { LoginComponent } from 'src/app/components/login/login.component';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AdminComponent, CarRegisterComponent, DriverRegisterComponent, RiderRegisterComponent, LoginComponent],
    imports: [HttpClientModule, AppRoutingModule, FormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
