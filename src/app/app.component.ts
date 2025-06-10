import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Helpdesk Ticketing System';
  isLoggedIn :any;

  ngOnInit(): void {
      // console.log(this.isLoggedIn)
      
      window.addEventListener('isLoggedIn', (event:any) => {
        this.isLoggedIn = event.detail.data;
        // console.log("isLoggedIn event received:", this.isLoggedIn);
        
      })
  }


  constructor(private auth: AuthService,private router: Router) {
    // this.auth.isLoggedInSubject.subscribe(status => {
    //   this.isLoggedIn = status;
    // });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  
}
