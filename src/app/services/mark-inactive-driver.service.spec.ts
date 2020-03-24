import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service/user.service';
import { getRoutableComponents } from 'src/app/app-routing.module';

describe('MarkInactiveDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...getRoutableComponents()
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
