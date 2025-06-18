import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-landingpage',
  imports: [RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit {
  constructor() { }
authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.logout();
    this.authService.logInButtonVisibility(true);
  }

}
