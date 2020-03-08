import { TestBed } from '@angular/core/testing';

import { EmployeeServiceService } from './employee-service.service';

describe('EmployeeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeServiceService = TestBed.get(EmployeeServiceService);
    expect(service).toBeTruthy();
  });
});
