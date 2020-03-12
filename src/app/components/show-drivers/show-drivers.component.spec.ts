import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDriversComponent } from './show-drivers.component';

describe('ShowDriversComponent', () => {
  let component: ShowDriversComponent;
  let fixture: ComponentFixture<ShowDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
