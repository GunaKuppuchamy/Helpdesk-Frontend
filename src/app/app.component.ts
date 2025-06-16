import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Helpdesk Ticketing System';
  isLoggedIn: any;
  authService = inject(AuthService);
showLoginBtn: boolean = false;
  ngOnInit(): void {
    
 window.addEventListener('showLoginBtn', (event: any) => {
      this.showLoginBtn = event.detail.data;

    })
    
    window.addEventListener('isLoggedIn', (event: any) => {
      this.isLoggedIn = event.detail.data;
      

    })
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
