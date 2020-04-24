import { TestBed } from '@angular/core/testing';

import { BatchService } from './batch.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { of } from 'rxjs';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

describe('BatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AdminComponent, CarRegisterComponent, UserRegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
    imports: [HttpClientModule, AppRoutingModule, FormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  }));

  it('should be created', () => {
    const service: BatchService = TestBed.get(BatchService);
    expect(service).toBeTruthy();
  });
});



describe('BatchService', () => {
  let batchService: BatchService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [AdminComponent, CarRegisterComponent, UserRegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
    imports: [HttpClientModule, AppRoutingModule, FormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  })

  batchService = TestBed.get(BatchService);
})

it('should register a batch', () => {
  expect(batchService).toBeTruthy();
});

 //Adding test for getAllBatches() method
 describe('getAllBatches', () => {
  it('should return a list of batches', () => {
    const batchResponse = [
      {
        batchNumber: 1,
        batchLocation: 'NYC'
      },
      {
        batchNumber: 2,
        batchLocation: 'VA'
      }
    ];
    let response;
    spyOn(batchService, 'getAllBatches').and.returnValue(of(batchResponse));

    // batchService.getAllBatches().subscribe(res => {
    //   response = res;
    // });

    expect(response).toEqual(batchResponse);
  });
});
});