import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule,RouterModule,CommonModule,HttpClientModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';

  otpSent: boolean = false;
  otpVerified: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

 
  sendOtp() {
  this.http.post('http://localhost:3002/sendotp', { email: this.email }).subscribe( {
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
    this.http.post('http://localhost:3002/verifyotp', { email: this.email, otp: this.otp }).subscribe((res: any) => {
      if (res.valid) {
        this.otpVerified = true;
        alert('OTP verified. Please enter a new password.');
      } else {
        alert('Invalid OTP.');
      }
    });
  }

  resetPassword() {
  this.http.post('http://localhost:3002/resetpassword', { email: this.email, newPassword: this.newPassword }).subscribe({
    next: () => {
      alert('Password reset successful. Redirecting to login.');
      this.router.navigate(['/']);
    },
    error: (err:any) => {
      alert('Failed to reset password.');
    }
  });
}
}
