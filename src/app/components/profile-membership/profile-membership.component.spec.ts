import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMembershipComponent } from './profile-membership.component';

describe('ProfileMembershipComponent', () => {
  let component: ProfileMembershipComponent;
  let fixture: ComponentFixture<ProfileMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
