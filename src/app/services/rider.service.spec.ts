import { TestBed } from '@angular/core/testing';

import { RiderService } from './rider.service';

describe('RiderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiderService = TestBed.get(RiderService);
    expect(service).toBeTruthy();
  });
});
