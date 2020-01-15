import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { DriverComponent } from './driver.component';
import { AppComponent } from 'src/app/app.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';


describe('DriverComponent', () => {
  let component: DriverComponent;
  // let fixture: ComponentFixture<DriverComponent>;

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
          DriverComponent],
        imports: 
        [HttpClientModule, 
          AppRoutingModule, 
          FormsModule
        ],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    component.location = '';
    component.riders = [{
      userId: 1,
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


  it('logout()', () => {
    component.router.navigate(['']);
    component.logout();
    expect(component.router.navigate).toHaveBeenCalled;
  });
});
