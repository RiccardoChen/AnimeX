import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccRequestService } from '../services/account/acc-request.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const accService = inject(AccRequestService);
  const router = inject(Router);

  return accService.getRole().pipe(
    map(res => {
      if (res.role === 'Admin') {
        router.navigate(['/profile']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/animeHome']);
      return of(false);
    })
  );
};
