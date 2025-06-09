import { Component, inject,signal } from '@angular/core';

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

//   allTickets = signal<Array<Ticket>>([]);;
//   filteredTickets: Ticket[] = [];

  constructor(private route: ActivatedRoute){}


ticketService = inject(TicketsService);
  display_tickets = signal<Array<Ticket>>([]);

  ngOnInit(): void {
    // const userId = 'U001';
    const type = this.route.snapshot.paramMap.get('user');
  console.log(type)
    this.ticketService.getTicketByUser().subscribe({
      next: (tickets: Ticket[]) => {
        //alert("called");
        if (type && ['open', 'closed', 'cancelled', 'onHold'].includes(type)) {
        const filtered = tickets.filter(t => t.status === type);
        this.display_tickets.set(filtered);
      } else {
        this.display_tickets.set(tickets);
      }
        console.log(this.display_tickets)
        console.log("Fetched tickets:", tickets);
      }, 
      error: (err) => {
        console.error("Failed to fetch tickets", err);
      }
    });
  }
  this_ticket !: Ticket

cancelTicket(tid:string)
  {
    this.ticketService.getTicketById(tid).subscribe({
  next: (ticket) => {
    ticket.status = "cancelled"; 

    this.ticketService.updateTickets(tid, ticket).subscribe({
      next: () => {
        alert("Ticket Cancelled");
        this.ngOnInit(); 
      },
      error: () => {
        alert("Error Cancelling Ticket");
      }
    });
  },
  error: () => {
    alert("Error fetching ticket");
  }
});

  }


}
