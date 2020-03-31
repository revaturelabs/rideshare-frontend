import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListEntryComponent } from './driver-list-entry.component';

describe('DriverListEntryComponent', () => {
  let component: DriverListEntryComponent;
  let fixture: ComponentFixture<DriverListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
