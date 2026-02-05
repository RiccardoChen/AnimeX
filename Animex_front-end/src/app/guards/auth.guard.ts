import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/credentials/auth.service";
import {map, take, tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    tap(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate(['/profile']);
      }
    }),
    map(isLoggedIn => !isLoggedIn)
  );
};
