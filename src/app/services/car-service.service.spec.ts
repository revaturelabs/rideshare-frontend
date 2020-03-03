import { TestBed } from '@angular/core/testing';

import { CarServiceService } from './car-service.service';

describe('CarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarServiceService = TestBed.get(CarServiceService);
    expect(service).toBeTruthy();
  });
});
