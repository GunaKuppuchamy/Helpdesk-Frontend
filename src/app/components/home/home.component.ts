import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../../services/login.service';
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

  constructor(private router: Router,  private loginService:LoginService) { }

  login() {
    if(this.role===''){
      alert('Please select a valid user type');
      return
    }
    this.loginService.login(this.email,this.password,this.role).subscribe({
      next:(response)=>{
        // alert('called');
        // alert(response);
        console.log(document.cookie+"hiiii");
      if(response.status===200){
        // alert(response.status);
           switch (this.role) {
      case 'user':
        this.router.navigate(['/user']);
        break;
      case 'it':
        this.router.navigate(['/it-team']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      // default:
      //   alert('Please select a valid user type');
    }
      }
      else{
        this.router.navigate(['']);
      }
    }})
  }
}
