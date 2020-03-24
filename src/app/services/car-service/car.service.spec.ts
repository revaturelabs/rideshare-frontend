import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from 'src/app/services/user-service/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {

}

describe('CarService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'car', component: DummyComponent }]
        )
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' },
      { provide: UserService, userClass: MockUserService }]
    }));

  fit('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });
});


class MockUserService {

}
