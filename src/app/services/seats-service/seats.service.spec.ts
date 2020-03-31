import { TestBed } from '@angular/core/testing';

import { SeatsService } from './seats.service';

describe('SeatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeatsService = TestBed.get(SeatsService);
    expect(service).toBeTruthy();
  });
});
