// import { Component, inject } from '@angular/core';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
 
@Component({
  selector: 'app-admin-view-users',
  imports: [CommonModule, TableModule,RouterLink],
  templateUrl: './admin-view-users.component.html',
  styleUrl: './admin-view-users.component.css'
})
export class AdminViewUsersComponent {
 
  userservice=inject(UserServiceService);
  router=inject(Router);
 
  allUsers:Users[]=[];
 
  ngOnInit():void
  {
    this.allUsers=this.userservice.getUsers();
  }
 
  editUser(id:string)
  {
    this.router.navigate(['/addUser',id]);
  }
 
  deleteUser(id:string)
  {
    if(confirm("Are you sure you want to delete this user? "))
    {
      this.userservice.deleteUserById(id);
      this.ngOnInit();
    }
  }
 
}