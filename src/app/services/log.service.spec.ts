import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('LogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...getRoutableComponents()
    ]
  }));

  it('should be created', () => {
    const service: LogService = TestBed.get(LogService);
    expect(service).toBeTruthy();
  });
});
