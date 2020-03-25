import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterComponent } from './user-register.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('DriverRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserRegisterComponent,
        ...getRoutableComponents()
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
