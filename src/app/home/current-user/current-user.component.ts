import { Component , inject, OnInit} from '@angular/core';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-current-user',
  imports: [CommonModule],
  templateUrl: './current-user.component.html',
  styleUrl: './current-user.component.css'
})
export class CurrentUserComponent implements OnInit {
  currentUser !:Users;
  authservice = inject(AuthService)

  ngOnInit(): void {
       this.authservice.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data.body;
        console.log(this.currentUser)
      },
      error: (err) => {
        console.error("Error fetching user:", err);
      }
    });
  
  }

}
