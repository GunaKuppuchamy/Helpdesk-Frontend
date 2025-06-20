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



 loginStatusChanged = new EventEmitter<boolean>();

isUserLoggedIn(): Observable<boolean> {
  return this.http.get<{ empid?: string }>(`${this.apiUrl}/currentUser`, { withCredentials: true }).pipe(
    map((res) => {
      const status = !!res?.empid;
      this.loginStatusChanged.emit(status);
      return status;
    }),
    catchError((err: HttpErrorResponse) => {
      this.loginStatusChanged.emit(false);
      
      
      if (this.router.url !== '/login') {
        alert('Session expired. Please log in again.');
        this.router.navigate(['/login']);
      }
      return of(false);
    })
  );
}


  logout() {

    this.loginservice.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
         this.currentUser = null; 
        this.loginStatusChanged.emit(false);
        
        
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
    this.loginStatusChanged.emit(false);
   
    return true;  
  }
  return false;  
}

}
