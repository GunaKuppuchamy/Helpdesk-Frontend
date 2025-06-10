import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule,RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  loginForm!:FormGroup;
  private fb=inject(FormBuilder);
  authservice=inject(AuthService);

  ngOnInit()
  {
    setTimeout(() => this.authservice.logout(), 0);
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:['',[Validators.required,Validators.minLength(5)]],
      role:['',Validators.required]
    })
  }

  

  constructor(private router: Router) { }
  login() {
    if (this.loginForm.valid) {
      this.authservice.login();   
    const role = this.loginForm.value.role;
    switch (role) {
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
}
