import { Component , inject, OnInit} from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-user',
  imports: [CommonModule],
  templateUrl: './current-user.component.html',
  styleUrl: './current-user.component.css'
})
export class CurrentUserComponent implements OnInit {
  currentUser !:Users;
  userservice = inject(UserServiceService)

  ngOnInit(): void {
       this.userservice.getCurrentUser().subscribe({
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
