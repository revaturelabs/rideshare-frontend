import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavbarComponent } from './bs-navbar.component';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BsNavbarComponent,
        ...getRoutableComponents()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
