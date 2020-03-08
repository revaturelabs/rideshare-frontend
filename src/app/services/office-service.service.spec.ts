import { TestBed } from '@angular/core/testing';

import { OfficeServiceService } from './office-service.service';

describe('OfficeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfficeServiceService = TestBed.get(OfficeServiceService);
    expect(service).toBeTruthy();
  });
});
