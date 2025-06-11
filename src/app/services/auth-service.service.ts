import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginservice = inject(LoginService);
  // public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login() {
    // this.isLoggedInSubject.next(true); 
    // const event = new CustomEvent('isLoggedIn', {
    //   detail: { data: true }
    // });
    // window.dispatchEvent(event);

  }

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
        const event = new CustomEvent('isLoggedIn', {
          detail: { data: false }
        });
        window.dispatchEvent(event);
        console.log("Logged Out");
      },
      error: () => {
        console.log("Error Logging out")
      }
    })
  }
}
