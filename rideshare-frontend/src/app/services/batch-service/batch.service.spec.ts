import { TestBed } from '@angular/core/testing';
import { BatchService } from './batch.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, getRoutableComponents } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';

describe('BatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...getRoutableComponents()
    ],
    imports: [HttpClientModule, AppRoutingModule, FormsModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
  }));

  it('should be created', () => {
    const service: BatchService = TestBed.get(BatchService);
    expect(service).toBeTruthy();
  });
});
