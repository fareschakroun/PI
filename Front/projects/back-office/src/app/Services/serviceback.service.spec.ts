import { TestBed } from '@angular/core/testing';

import { ServicebackService } from './serviceback.service';

describe('ServicebackService', () => {
  let service: ServicebackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicebackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
