import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginservice = inject(LoginService);
  
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
        this.isLoggedOut();
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
