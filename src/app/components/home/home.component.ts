import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  email = "";
  password = "";
  role = ""

  constructor(private router: Router,  private loginService:LoginService , private userservice : UserServiceService) { }
  ngOnInit(): void {

   
      
  }

  
  login() {

  //   if(this.role===''){
  //     alert('Please select a valid user type');
  //     return
  //   }
  //   this.loginService.login(this.email,this.password,this.role).subscribe({
  //     next:(response)=>{
  //       // alert('called');
  //       // alert(response);
  //       console.log(document.cookie+"hiiii");
  //     if(response.status===200){
  //       // alert(response.status);
  //          switch (this.role) {
  //     case 'user':
  //       this.router.navigate(['/user']);
  //       break;
  //     case 'it':
  //       this.router.navigate(['/it-team']);
  //       break;
  //     case 'admin':
  //       this.router.navigate(['/admin']);
  //       break;
  //     // default:
  //     //   alert('Please select a valid user type');
  //   }
  //     }
  //     else{
  //       this.router.navigate(['']);
  //     }
  //   }})

    if (!this.email || !this.password) {
    alert('Please enter email and password');
    return;
  }

  this.loginService.login(this.email, this.password).subscribe({
    next: (response: any) => {
      console.log(response)
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
