import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private isLoggedService:AuthService) {}

  ngOnInit(): void {
    this.isLoggedService.isLoggedIn();
  }

  

}
