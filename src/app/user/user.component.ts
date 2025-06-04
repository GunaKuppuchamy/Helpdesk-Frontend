import { Component, inject } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Users } from '../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userservice=inject(UserServiceService);
  router=inject(Router);

  userData:Users[]=this.userservice.getUsers();

  onAddTicket()
  {
    this.router.navigate(['/userAddTicket']);
  }

}
