import { TestBed } from '@angular/core/testing';

import { ServicefrontService } from './servicefront.service';

describe('ServicefrontService', () => {
  let service: ServicefrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
