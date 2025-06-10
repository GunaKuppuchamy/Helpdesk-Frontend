import { Injectable , inject} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginservice = inject(LoginService);
 public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login() {
    this.isLoggedInSubject.next(true);                            
  }

  logout() {
    this.loginservice.logout().subscribe({
      next : () =>
      {
        console.log("Logged Out");
      },
      error : () =>
      {
        console.log("Error Logging out")
      }
    })
    this.isLoggedInSubject.next(false);                             
  }
}
