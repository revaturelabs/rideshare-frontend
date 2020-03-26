import { TestBed } from '@angular/core/testing';

import { LocationServiceService } from './location.service';

describe('LocationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationServiceService = TestBed.get(LocationServiceService);
    expect(service).toBeTruthy();
  });
});
