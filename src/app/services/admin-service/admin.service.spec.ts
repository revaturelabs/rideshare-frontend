import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...getRoutableComponents()
    ]
  }));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
