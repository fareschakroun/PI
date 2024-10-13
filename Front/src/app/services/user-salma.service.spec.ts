import { TestBed } from '@angular/core/testing';

import { UserSalmaService } from './user-salma.service';

describe('UserSalmaService', () => {
  let service: UserSalmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSalmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
