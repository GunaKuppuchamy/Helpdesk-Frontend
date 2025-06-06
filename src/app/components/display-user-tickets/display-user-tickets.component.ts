import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-user-tickets',
  imports: [CommonModule,RouterLink],
  templateUrl: './display-user-tickets.component.html',
  styleUrl: './display-user-tickets.component.css'
})
export class DisplayUserTicketsComponent {

  allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  constructor(private route: ActivatedRoute){}
  ticketservice=inject(TicketsService)

 ngOnInit(): void {
  const currentUserId = 'U001';  // or from AuthService in real case
  this.allTickets = this.ticketservice.getTicketsByUser(currentUserId);

  const type = this.route.snapshot.paramMap.get('type');

  if (type && ['open', 'closed', 'cancelled', 'onHold'].includes(type)) {
    this.filteredTickets = this.allTickets.filter(t => t.status === type);
  } else {
    this.filteredTickets = this.allTickets;  // default: show all
  }

  
}

cancelTicket(tid:string)
  {
    const confirmcancel=confirm('Are you sure you want to cancel this Ticket');
    if(confirmcancel)
    {
      this.ticketservice.cancelTicketById(tid);
    }
  }


}
