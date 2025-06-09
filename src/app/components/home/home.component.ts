import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  email = "";
  password = "";
  role = ""

  constructor(private router: Router) { }
  login() {
    switch (this.role) {
      case 'User':
        this.router.navigate(['/user']);
        break;
      case 'IT':
        this.router.navigate(['/it-team']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        alert('Please select a valid user type');
    }
  }
}
