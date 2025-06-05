import { Component, inject } from '@angular/core';
import { Ticket } from '../../models/ticket.type';
import { TicketsService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view-tickets',
  imports: [CommonModule],
  templateUrl: './admin-view-tickets.component.html',
  styleUrl: './admin-view-tickets.component.css'
})
export class AdminViewTicketsComponent {

  allTickets:Ticket[]=[];
  ticketservice=inject(TicketsService);

  ngOnInit()
  {
    this.allTickets=this.ticketservice.getTickets();
  }

}
