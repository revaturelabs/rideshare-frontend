import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from 'selenium-webdriver/http';
import { getRoutableComponents } from 'src/app/app-routing.module';

@Component({ template: '' })
class DummyComponent {

}

describe('CarService', () => {

  let mockRouter: { navigate: jasmine.Spy };
  let mockHttpClient: {};
  let mockUserService: {};
  beforeEach(() => {

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    mockUserService = jasmine.createSpyObj('UserService', ['updateIsDriver']);

    TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
        ...getRoutableComponents()
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'car', component: DummyComponent }]
        )
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' },
      { provide: UserService, useValue: mockUserService },
      { provide: Router, useValue: mockRouter },
      { provide: HttpClient, useValue: mockHttpClient }
      ]
    });
  });

  it('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });
});

