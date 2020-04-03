import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCarComponent } from './my-car.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('MyCarComponent', () => {
  let component: MyCarComponent;
  let fixture: ComponentFixture<MyCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
