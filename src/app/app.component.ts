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
    // console.log(this.isLoggedIn)
 window.addEventListener('showLoginBtn', (event: any) => {
      this.showLoginBtn = event.detail.data;

    })
    // this.authService.isLoggedIn();
    window.addEventListener('isLoggedIn', (event: any) => {
      this.isLoggedIn = event.detail.data;
      // console.log("isLoggedIn event received:", this.isLoggedIn);

    })
  }


  constructor(private auth: AuthService, private router: Router) {
    // this.auth.isLoggedInSubject.subscribe(status => {
    //   this.isLoggedIn = status;
    // });
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
