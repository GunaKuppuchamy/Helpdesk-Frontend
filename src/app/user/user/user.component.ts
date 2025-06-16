import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Users } from '../../models/users';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userservice=inject(UserServiceService);
  authService=inject(AuthService);
  router=inject(Router);

  curUserData!:Users;

  onAddTicket()
  {
    this.router.navigate(['addTicket']);
  }


  ngOnInit():void
  {
    this.authService.isLoggedIn();
    
  }

}
