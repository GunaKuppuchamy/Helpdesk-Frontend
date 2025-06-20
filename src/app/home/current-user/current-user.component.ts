import { Component , inject, OnInit} from '@angular/core';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-user',
  imports: [CommonModule],
  templateUrl: './current-user.component.html',
  styleUrl: './current-user.component.css'
})
export class CurrentUserComponent implements OnInit {
  currentUser !:Users;
  authservice = inject(AuthService)
  router = inject(Router)
  role !:string

  ngOnInit(): void {
       this.authservice.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
        this.role=this.currentUser.role;
        console.log(this.currentUser.role)
      },
      error: (err) => {
        console.error("Error fetching user:", err);
      }
    });
  
  }

  redirectFn()
  {
    if(this.role === 'admin')
    {
      this.router.navigate(['/admin'])
    }
    else if(this.role === 'it')
    {
      this.router.navigate(['/it-team'])
    }

    else if(this.role === 'user')
    {
      this.router.navigate(['/user'])
    }
  }

}
