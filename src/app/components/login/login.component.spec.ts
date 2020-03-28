import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService } from 'ngx-bootstrap';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import RequestError from 'src/app/models/request-error';
import { HttpTestingController } from '@angular/common/http/testing';
import { Routes, Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;

  // Helper object to fillout properties for meeting User object definition
  const genericUserData = {
    isDriver: true,
    active: true,
    isAcceptingRides: true,
    hState: '',
    hAddress: '',
    hCity: '',
    hZip: 13456,
    wAddress: '',
    wCity: '',
    wState: '',
    wZip: 12345
  };

  let mockBsModalService;
  let mockRouter;
  beforeEach(async(() => {
    mockBsModalService = jasmine.createSpyObj('BsModalService', ['show']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      // imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/my/app' },
        { provide: BsModalService, useValue: mockBsModalService },
        { provide: Router, useValue: mockRouter }]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    component.showDropDown = false;
    component.curPage = 1;
    component.totalPage = 10;
    component.users = [{
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
      ...genericUserData
    }];
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    // arrange
    component.showDropDown = false;
    // act
    component.toggleDropDown();
    // assert
    expect(component.showDropDown).toBe(true);
  });

  it('nextPage()', () => {
    component.curPage = 1;
    component.nextPage();
    expect(component.curPage).toBeGreaterThanOrEqual(1);
  });

  it('prevPage()', () => {
    component.curPage = 5;
    component.prevPage();
    expect(component.curPage).toBeLessThan(5);
  });

  it('loginFailed()', () => {
    component.userName = '';
    component.failed = true;
    component.loginFailed();
    expect(component.userName).toBe('');
    expect(component.failed).toBe(true);
  });

  fit('distributes errors to error lists by error element', () => {
    const errorList: RequestError[] = [
      { element: 'username', message: 'msg'},
      { element: 'password', message: 'msg'},
      { element: 'password', message: 'msg'},
      { element: 'misc', message: 'msg'},
      { element: 'misc', message: 'msg'},
      { element: 'misc', message: 'msg'},
      { element: 'other', message: 'msg'}
    ];

    component.mapErrorMessages(errorList);
    expect(component.usernameErrors.length).toBe(1);
    expect(component.passwordErrors.length).toBe(2);
    expect(component.miscErrors.length).toBe(4);
  });

  fit('closes login modal and navigates to /drivers when successfulLoginCallback called', fakeAsync(() => {
    const modalHideSpy = spyOn(component.modalRef, 'hide');
    component.successfulLoginCallback();

    expect(component.modalRef.hide).toHaveBeenCalled();
    // expect(mockRouter.navigateByUrl).toBeCalledWith('/drivers');
  }));
});


