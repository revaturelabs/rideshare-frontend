import { async, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService } from 'ngx-bootstrap';
import RequestError from 'src/app/models/request-error';
import { Routes, Router, Route } from '@angular/router';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { DriverListComponent } from 'src/app/components/driver-list/driver-list.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;

  const routes: Routes = [{
    path: '', component: HomePageComponent
  }, {
    path: 'drivers', component: DriverListComponent
  }];

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
  let router;
  let authService: AuthService;
  let spyAuthenticatedUser$;
  let spyLoginErrors$;
  beforeEach(async(() => {
    mockBsModalService = jasmine.createSpyObj('BsModalService', ['show']);

    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      imports: [HttpClientModule, AppRoutingModule, FormsModule,
          RouterTestingModule.withRoutes(routes)
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/my/app' },
        { provide: BsModalService, useValue: mockBsModalService }
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    spyAuthenticatedUser$ = spyOn(authService.authenticatedUser$, 'subscribe');
    spyLoginErrors$ = spyOn(authService.loginErrors$, 'subscribe');
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

  describe('ngOnInit', () => {
    it('should subscribe to authService authenticatedUser$ data pipeline', () => {
      component.ngOnInit();
      expect(spyAuthenticatedUser$).toHaveBeenCalled();
    });

    it('should subscribe to authService loginErrors$ data pipeline', () => {
      component.ngOnInit();
      expect(spyLoginErrors$).toHaveBeenCalled();
    });
  });

  describe('mapErrorMessages', () => {
    it('should distribute errors to error lists by error element', () => {
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

    it('should correctly map error strings into the appropriate buckets', () => {
      const usernameMessage = 'U';
      const passwordMessage = 'P';
      const miscMessage = 'M';

      const errors: RequestError[] = [
        {element: 'username', message: usernameMessage},
        {element: 'password', message: passwordMessage},
        {element: 'other', message: miscMessage},
      ];

      component.mapErrorMessages(errors);
      expect(component.usernameErrors).toContain(usernameMessage);
      expect(component.passwordErrors).toContain(passwordMessage);
      expect(component.miscErrors).toContain(miscMessage);
    });
  });

  describe('successfulLoginCallback', () => {
    let navigateSpy: jasmine.Spy;
    let expectedRoute: Route;

    beforeEach(() => {
      component.modalRef = jasmine.createSpyObj('modalRef', ['hide']);
      navigateSpy = spyOn(router, 'navigateByUrl');
      expectedRoute = routes.filter(r => r.component === DriverListComponent)[0];
    });

    it('should close modal', fakeAsync(() => {
      component.successfulLoginCallback();
      expect(component.modalRef.hide).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(`/${expectedRoute.path}`);
    }));

    it('should navigate to show DriversListComponent', () => {
      component.modalRef = jasmine.createSpyObj('modalRef', ['hide']);
      component.successfulLoginCallback();
      expect(navigateSpy).toHaveBeenCalledWith(`/${expectedRoute.path}`);
    });
  });

});


