import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { AdminComponent } from '../components/admin/admin.component';
import { CarRegisterComponent } from '../components/car-register/car-register.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { MyCarComponent } from '../components/my-car/my-car.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PreferenceComponent } from '../components/preference/preference.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { DriverInfoComponent } from '../components/driver-info/driver-info.component';
import { DriverComponent } from '../components/driver/driver.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('LogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
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
  }));

  it('should be created', () => {
    const service: LogService = TestBed.get(LogService);
    expect(service).toBeTruthy();
  });
});
