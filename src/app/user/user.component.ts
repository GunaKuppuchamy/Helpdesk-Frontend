import { Component, inject } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Users } from '../models/users';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userservice=inject(UserServiceService);
  router=inject(Router);

  curUserData!:Users;

  onAddTicket()
  {
    this.router.navigate(['addTicket']);
  }

  curUserId:string='U001';

  ngOnInit():void
  {
    //this.curUserData=this.userservice.getUserById(this.curUserId);
  }

}
