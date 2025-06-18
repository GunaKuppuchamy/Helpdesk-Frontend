import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Helpdesk Ticketing System';
  isLoggedIn!: boolean;
  http=inject(HttpClient)
  authService = inject(AuthService);
showLoginBtn: boolean = false;

userLogged !: boolean;
  ngOnInit(): void {
    
 window.addEventListener('showLoginBtn', (event: any) => {
      this.showLoginBtn = event.detail.data;

    })
    
    window.addEventListener('isLoggedIn', (event: any) => {
      this.isLoggedIn = event.detail.data;
      

    })

    this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.userLogged = status;
    });

    this.authService.isUserLoggedIn().subscribe((
      {
        next : (loggedVal)=>
        {
          this.userLogged = loggedVal;
          console.log(loggedVal)
        }
      }
    ))
  }


  constructor(private auth: AuthService, private router: Router) {
    
  }
login(){
  this.router.navigate(['/login']);
}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.authService.isLoggedOut();

  }


}
