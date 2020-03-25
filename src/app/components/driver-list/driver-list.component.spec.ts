import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListComponent } from './driver-list.component';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('DriverListComponent', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
