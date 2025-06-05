import { Component , inject,OnInit,signal} from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../models/ticket.type';
import { CommonModule } from '@angular/common';
import { tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-it-team',
  imports: [CommonModule,RouterModule],
  templateUrl: './it-team.component.html',
  styleUrl: './it-team.component.css'
})
export class ItTeamComponent  {

  


}
