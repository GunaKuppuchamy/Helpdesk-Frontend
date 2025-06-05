import { Component, inject } from '@angular/core';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-admin-view-users',
  imports: [CommonModule],
  templateUrl: './admin-view-users.component.html',
  styleUrl: './admin-view-users.component.css'
})
export class AdminViewUsersComponent {

  userservice=inject(UserServiceService);

  allUsers:Users[]=[];

  ngOnInit():void
  {
    this.allUsers=this.userservice.getUsers();
  }

}
