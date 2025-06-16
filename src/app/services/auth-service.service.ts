import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';

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
        // const event = new CustomEvent('isLoggedIn', {
        //   detail: { data: false }
        // });
        // window.dispatchEvent(event);
        this.isLoggedOut();
        console.log("Logged Out");
      },
      error: () => {
        console.log("Error Logging out")
      }
    })
  }
}
