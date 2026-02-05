import { TestBed } from '@angular/core/testing';

import { AnimeRequestService } from './anime-request.service';

describe('AnimeRequestService', () => {
  let service: AnimeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
