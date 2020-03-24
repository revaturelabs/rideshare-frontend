import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService } from 'ngx-bootstrap';

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

  beforeEach(async(() => {
    mockBsModalService = jasmine.createSpyObj('BsModalService', ['show']);
    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      // imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/my/app' },
        { provide: BsModalService, useValue: mockBsModalService }]
    })
      .compileComponents();
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

  xit('should change user in login dropdown', () => {

    // arrange
    const user = component.users = [{
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
    // act
    component.changeUser(user);
    // assert
    expect(component.users).toEqual(user);
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

});
