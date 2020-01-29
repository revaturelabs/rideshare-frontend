import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCarComponent } from './profile-car.component';

describe('ProfileCarComponent', () => {
  let component: ProfileCarComponent;
  let fixture: ComponentFixture<ProfileCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
