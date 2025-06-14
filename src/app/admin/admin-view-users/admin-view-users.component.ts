// import { Component, inject } from '@angular/core';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-admin-view-users',
  imports: [CommonModule, TableModule, RouterLink],
  templateUrl: './admin-view-users.component.html',
  styleUrl: './admin-view-users.component.css'
})
export class AdminViewUsersComponent {

  userservice = inject(UserServiceService);
  router = inject(Router);
  authService = inject(AuthService);
  allUsers!: Users[];

  ngOnInit(): void {
    //this.allUsers=this.userservice.getUsers();
    this.authService.isLoggedIn();
    this.userservice.getUsersApi().subscribe({
      next: (response) => {
        this.allUsers = response.body || [];
        console.log(response)
      },
      error: (err) => {

      if(err.status == 401)
      {
        this.router.navigate(['/']);
      }

      }
    })
  }
  editUser(id: string) {
    this.router.navigate(['/addUser', id]);
  }
  deleteUser(id: string) {
    console.log(id);
    if (confirm("Are you sure you want to delete this user? ")) {
      this.userservice.deleteUserById(id).subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error : (err) =>
        {
          if(err.status == 401)
          {
            this.router.navigate(['/'])
          }

        }

      });

    }
  }

}
