import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  resetForm!: FormGroup;

  otpSent = false;
  otpVerified = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit() {
    this.authService.isLoggedIn();
    this.authService.logout();

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  sendOtp() {
    const email = this.emailForm.value.email;
    this.http.post('http://localhost:3002/sendotp', { email }).subscribe({
      next: () => {
        this.otpSent = true;
        alert('OTP sent to your email.');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to send OTP. Please try again.');
      }
    });
  }

  verifyOtp() {
    const email = this.emailForm.value.email;
    const otp = this.otpForm.value.otp;
    this.http.post('http://localhost:3002/verifyotp', { email, otp }).subscribe((res: any) => {
      if (res.valid) {
        this.otpVerified = true;
        alert('OTP verified. Please enter a new password.');
      } else {
        alert('Invalid OTP.');
      }
    });
  }

  resetPassword() {
    const email = this.emailForm.value.email;
    const newPassword = this.resetForm.value.newPassword;
    this.http.post('http://localhost:3002/resetpassword', { email, newPassword }).subscribe({
      next: () => {
        alert('Password reset successful. Redirecting to login.');
        this.router.navigate(['/login']);
        this.authService.isLoggedOut();

      },
      error: () => {
        alert('Failed to reset password.');
      }
    });
  }
}
