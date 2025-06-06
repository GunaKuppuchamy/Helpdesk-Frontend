import { Component, inject,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-user-tickets',
  imports: [CommonModule],
  templateUrl: './display-user-tickets.component.html',
  styleUrl: './display-user-tickets.component.css'
})
export class DisplayUserTicketsComponent {

//   allTickets = signal<Array<Ticket>>([]);;
//   filteredTickets: Ticket[] = [];

  constructor(private route: ActivatedRoute){}
//   ticketservice=inject(TicketsService)

//  ngOnInit(): void {
//   const ticketId = 'U001';  
//   console.log(ticketId)

//   if (ticketId) {
//     this.ticketservice.getTicketByUser(ticketId).subscribe({
//       next: (ticket) => {
//         this.allTickets.set(ticket); 
//         const type = this.route.snapshot.paramMap.get('user');
//         console.log(type)

//         if (type && ['open', 'closed', 'cancelled', 'onHold'].includes(type)) {
//           this.filteredTickets = [ticket].filter(t => t.status === type);
//         } else {
//           this.filteredTickets = [ticket];
//         }
//       },
//       error: (err) => {
//         console.error('Error fetching ticket', err);
//         alert('Ticket not found or error occurred');
//         this.allTickets.set([]);
//         this.filteredTickets = [];
//       }
//     });

//     console.log(this.allTickets)
//     console.log(this.filteredTickets)
//   }
// }

ticketService = inject(TicketsService);
  display_tickets = signal<Array<Ticket>>([]);

  ngOnInit(): void {
    const userId = 'U001';
    const type = this.route.snapshot.paramMap.get('user');
  console.log(type)
    this.ticketService.getTicketByUser(userId).subscribe({
      next: (tickets: Ticket[]) => {
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

cancelTicket(tid:string)
  {
    // const confirmcancel=confirm('Are you sure you want to cancel this Ticket');
    // if(confirmcancel)
    // {
    //   this.ticketService.cancelTicketById(tid);
    // }
  }


}
