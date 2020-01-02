import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbanComponent } from './adminban.component';

describe('AdminbanComponent', () => {
  let component: AdminbanComponent;
  let fixture: ComponentFixture<AdminbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
