import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProfileMembershipComponent } from './profile-membership.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
describe('ProfileMembershipComponent', () => {
  let component: ProfileMembershipComponent;
  let fixture: ComponentFixture<ProfileMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMembershipComponent ],
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      schemas: [ NO_ERRORS_SCHEMA]
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
