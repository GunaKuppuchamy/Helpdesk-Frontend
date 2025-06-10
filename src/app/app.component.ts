import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Helpdesk Ticketing System';
  isLoggedIn = false;


  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.auth.logout();
  }

  
}
