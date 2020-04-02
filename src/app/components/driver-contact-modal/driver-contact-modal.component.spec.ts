import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverContactModalComponent } from './driver-contact-modal.component';

describe('DriverContactModalComponent', () => {
  let component: DriverContactModalComponent;
  let fixture: ComponentFixture<DriverContactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverContactModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
