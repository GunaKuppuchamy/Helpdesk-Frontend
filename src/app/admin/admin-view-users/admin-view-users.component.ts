// import { Component, inject } from '@angular/core';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

/**
 * Facilatates add , edit and delete an user from the database
 */
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
    
    //this.authService.isLoggedIn();
    this.userservice.getUsersApi().subscribe({
      next: (response) => {
        this.allUsers = response.body || [];
        console.log(response)
      },
      error: (err) => {
  this.authService.sessionTimeout(err);

      }
    })
  }

  /**
   * Edit user function redirects to the add user form and patches the existing values
   * @param id 
   */
  editUser(id: string) {
    this.router.navigate(['/addUser', id]);
  }

  /**
   * Delete User function deletes the user by using the id details
   * @param id 
   */
  deleteUser(id: string) {
    console.log(id);
    if (confirm("Are you sure you want to delete this user? ")) {
      this.userservice.deleteUserById(id).subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error : (err) =>
        {
          if (!this.authService.sessionTimeout(err)) {
            console.log("Error deleting user")
          }

        }

      });

    }
  }

}
