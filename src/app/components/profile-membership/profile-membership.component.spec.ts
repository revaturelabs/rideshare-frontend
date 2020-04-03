import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMembershipComponent } from './profile-membership.component';
import { getRoutableComponents } from 'src/app/app-routing.module';
import { UserService } from 'src/app/services/user-service/user.service';
import { of } from 'rxjs';

describe('ProfileMembershipComponent', () => {
  let component: ProfileMembershipComponent;
  let fixture: ComponentFixture<ProfileMembershipComponent>;
  let mockUserService;

  beforeEach(async(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUserById2']);

    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      providers: [{ provide: UserService, useValue: mockUserService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMembershipComponent);
    component = fixture.componentInstance;
    mockUserService.getUserById2.and.returnValue(of(1));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
