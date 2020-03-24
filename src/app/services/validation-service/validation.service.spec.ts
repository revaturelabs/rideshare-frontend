import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...getRoutableComponents()
    ]
  }));

  it('should be created', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    expect(service).toBeTruthy();
  });
});
