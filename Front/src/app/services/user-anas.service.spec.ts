import { TestBed } from '@angular/core/testing';

import { UserAnasService } from './user-anas.service';

describe('UserAnasService', () => {
  let service: UserAnasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAnasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
