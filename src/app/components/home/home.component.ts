import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  email = "sree@gmail.com";
  password = "suvetha";
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
