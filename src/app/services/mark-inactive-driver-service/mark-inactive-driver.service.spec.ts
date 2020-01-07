import { TestBed } from '@angular/core/testing';

import { MarkInactiveDriverService } from './mark-inactive-driver.service';

describe('MarkInactiveDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkInactiveDriverService = TestBed.get(MarkInactiveDriverService);
    expect(service).toBeTruthy();
  });
});
