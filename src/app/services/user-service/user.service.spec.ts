import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let http = new HttpClientModule();
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientModule],
    declarations: [
      ...getRoutableComponents()
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('User creation rejected if number is not given as the first element', () => {
      const service: UserService = TestBed.get(UserService);
      const user: User = new User();
      user.hAddress = "NOTNUMBER Springdale Ave";
      service.addUser(user);
      expect(user.hState).toEqual('');
  });

});
