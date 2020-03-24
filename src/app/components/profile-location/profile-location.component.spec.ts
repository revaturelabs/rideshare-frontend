import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocationComponent } from './profile-location.component';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('ProfileLocationComponent', () => {
  let component: ProfileLocationComponent;
  let fixture: ComponentFixture<ProfileLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLocationComponent, ...getRoutableComponents()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
