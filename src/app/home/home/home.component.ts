

import { LoginService } from '../../services/login.service';

import { UserServiceService } from '../../services/user-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  email = "";
  password = "";
  // role = ""

  constructor(private router: Router, private loginService: LoginService, private userservice: UserServiceService) { }
  loginForm!: FormGroup;
  private fb = inject(FormBuilder);
  authservice = inject(AuthService);

  ngOnInit() {
    this.authservice.isLoggedOut();
    this.authservice.logInButtonVisibility(false);
    

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    
    })

  }


  login() {

   
    if (this.loginForm.invalid) {
      alert('Please enter valid email and password');
      return;
    }
    // this.authservice.login()

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: (response: any) => {
        const user = response.body;
        //this.authservice.setCurrentUser(user)
      this.authservice.isLoggedIn();
     // this.authservice.loginStatusChanged.emit(true);
        if (response.body.role) {
          
          switch (response.body.role) {
            case 'user':
              this.router.navigate(['/user']);
              break;
            case 'it':
              this.router.navigate(['/it-team']);
              break;
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            default:
              alert('Unknown role');
          }
        } else {
          alert('Role info not received');
        }
      },
      error: () => {
        alert('Login failed');
      }
    });


  }
}