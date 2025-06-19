import { inject, Injector } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];
  const multipleRole = route.data?.['allowMultipleRoles']

  return authService.getCurrentUser().pipe(
    map((user: any) => {

      if (!expectedRole && !multipleRole) {
        return true;
      }
      if (user && user.role === expectedRole) {
        return true;
      } 
      
      if(expectedRole)
      {
        if (!expectedRole || user.role === expectedRole) {
        return true;
      } 
      else
      {
        redirectBasedOnRole(router,user.role)
        return false;
      }
      }

      else if(multipleRole)
      {
        const routeRole = route.params?.['role'];
        if(user.role == routeRole)
        {
          return true;
        }
        else
        {
          redirectBasedOnRole(router,routeRole);
          return false;
        }
      }
       router.navigate(['/']);
      return false;
    
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

function redirectBasedOnRole(router : Router , role : string)
{
  switch(role)
  {
    
    case 'admin':
      router.navigate(['/admin']);
      break;
    case 'it':
      router.navigate(['/it-team']);
      break;
    case 'user':
      router.navigate(['/user']);
      break;
    default:
      router.navigate(['/']);
  
  }

}
