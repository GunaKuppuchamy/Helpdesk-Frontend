import { Component , inject,OnInit,signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

/**
 * Overview Component for all the It Team Navigation
 */

@Component({
  selector: 'app-it-team',
  imports: [CommonModule,RouterModule],
  templateUrl: './it-team.component.html',
  styleUrl: './it-team.component.css'
})
export class ItTeamComponent implements OnInit  {
authService = inject(AuthService);
  ngOnInit(): void {
      this.authService.isLoggedIn();
  }


}
