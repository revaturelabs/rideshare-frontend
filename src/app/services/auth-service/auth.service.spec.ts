import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...getRoutableComponents()
    ],
    imports: [AppRoutingModule, FormsModule, HttpClientModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
  }));
  let service: AuthService;

  beforeEach(() => {
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
