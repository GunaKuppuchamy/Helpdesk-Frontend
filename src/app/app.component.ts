import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
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

 constructor(private auth: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    
    this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.userLogged = status;
    });

  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const url = event.url;

      
      this.showLoginBtn = (url === '/' || url === '/faq');

      
      if (url === '/login' || url === '/forgot-password') {
        this.userLogged = false;
      }
    }
  });
  }

login(){
  this.router.navigate(['/login']);
}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    
    this.authService.loginStatusChanged.emit(false);

  }

}
