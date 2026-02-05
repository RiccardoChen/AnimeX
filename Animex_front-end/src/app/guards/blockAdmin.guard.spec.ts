import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockAdminGuard } from './blockAdmin.guard';

describe('blockAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => blockAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
