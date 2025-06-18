import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { map, catchError, of } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const injector = inject(Injector);
  const router = injector.get(Router);
  const authService = injector.get(AuthService);

  return authService.getCurrentUser().pipe(
    map((user: any) => {
      if (user && user.role) {
        
        switch (user.role) {
          case 'admin':
            router.navigate(['/admin']);
            break;
          case 'it':
            router.navigate(['/it-team']);
            break;
          case 'user':
            router.navigate(['/user']);
            break;
        }
        return false; 
      }
      return true; 
    }),
    catchError(() => of(true)) 
  );
};
