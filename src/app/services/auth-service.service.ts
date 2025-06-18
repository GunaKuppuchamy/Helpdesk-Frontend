import { EventEmitter, Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of,map,catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginservice = inject(LoginService);
  http=inject(HttpClient)
private apiUrl='http://localhost:3002'

  private currentUser: any = null;

setCurrentUser(user: any) {
  this.currentUser = user;
}

getCurrentUser(): Observable<any> {
  if (this.currentUser) {
    return of(this.currentUser);
  }

  return this.http.get(`${this.apiUrl}/currentUser`, { withCredentials: true });
}

//  loginStatusChanged = new EventEmitter<boolean>();

// isUserLoggedIn(): Observable<boolean> {
//   return this.http.get<{ empid?: string }>(`${this.apiUrl}/currentUser`, { withCredentials: true }).pipe(
//     map((res) => {
//       const status = !!res?.empid;
//       this.loginStatusChanged.emit(status);
//       return status;
//     }),
//     catchError((err: HttpErrorResponse) => {
//       this.loginStatusChanged.emit(false);
      
//       // Redirect only if not already on /login
//       if (this.router.url !== '/login') {
//         alert('Session expired. Please log in again.');
//         this.router.navigate(['/login']);
//       }
//       return of(false);
//     })
//   );
// }




  isLoggedIn(){
    const event = new CustomEvent('isLoggedIn', {
      detail: { data: true }
    });
    window.dispatchEvent(event);
  }

  isLoggedOut(){
    const event = new CustomEvent('isLoggedIn', {
      detail: { data: false }
    });
    window.dispatchEvent(event);
    
  }

  logInButtonVisibility(value: boolean) {
    const event = new CustomEvent('showLoginBtn', {
      detail: { data: value }
    });
    window.dispatchEvent(event);
  }



  logout() {

    this.loginservice.logout().subscribe({
      next: () => {
        // this.isLoggedInSubject.next(false);
         this.currentUser = null; 
        this.isLoggedOut();
        this.router.navigate(['/']);
        
      },
      error: () => {
        console.log("Error Logging out")
      }
    })
  }
  router=inject(Router)
 sessionTimeout(err: HttpErrorResponse): boolean {
  if (err.status === 401) {
    alert("Session Time Out. Please login again.");
     this.router.navigate(['/login']);
    this.isLoggedOut();
   
    return true;  
  }
  return false;  
}

}
