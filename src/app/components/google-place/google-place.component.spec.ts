import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePlaceComponent } from './google-place.component';

describe('GooglePlaceComponent', () => {
  let component: GooglePlaceComponent;
  let fixture: ComponentFixture<GooglePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
