import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccRequestService } from '../services/account/acc-request.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const blockAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accService = inject(AccRequestService);

  const token = localStorage.getItem('token');
  if (!token) {
    return of(true);
  }

  return accService.isValidToken().pipe(
    switchMap(valid => {
      if (!valid.status) return of(true);

      return accService.getRole().pipe(
        map(res => {
          if (res.role === 'Admin') {
            router.navigate(['/home']);
            return false;
          }
          return true;
        }),
        catchError(() => {
          return of(true);
        })
      );
    }),
    catchError(() => {
      return of(true);
    })
  );
};
