import { TestBed } from '@angular/core/testing';

import { AccRequestService } from './acc-request.service';

describe('AccRequestService', () => {
  let service: AccRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
