import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const injector = inject(Injector);
  const authService = inject(AuthService);
  const router = injector.get(Router);

  const expectedRole = route.data?.['role'];

  return authService.getCurrentUser().pipe(
    map((user: any) => {
      if (user && user.role === expectedRole) {
        return true;
      } else {
       
        
        if (user?.role === 'it') {
          router.navigate(['/it-team']);
        } else if (user?.role === 'admin') {
          router.navigate(['/admin']);
        } else if (user?.role === 'user') {
          router.navigate(['/user']);
        } else {
          router.navigate(['/']);
        }
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
