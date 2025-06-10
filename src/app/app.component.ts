import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Helpdesk Ticketing System';
  isLoggedIn = false;
ngOnInit(): void {
    console.log(this.isLoggedIn)
}

  constructor(private auth: AuthService) {
    this.auth.isLoggedInSubject.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.auth.logout();
  }

  
}
