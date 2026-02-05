import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccRequestService } from '../services/account/acc-request.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const onlyAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accService = inject(AccRequestService);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  return accService.isValidToken().pipe(
    switchMap(valid => {
      if (!valid.status) {
        router.navigate(['/login']);
        return of(false);
      }

      return accService.getRole().pipe(
        map(res => {
          if (res.role === 'Admin') {
            return true;
          } else {
            router.navigate(['/home']);
            return false;
          }
        }),
        catchError(() => {
          router.navigate(['/login']);
          return of(false);
        })
      );
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
