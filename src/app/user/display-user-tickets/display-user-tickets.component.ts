import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-display-user-tickets',
  imports: [CommonModule, RouterLink],
  templateUrl: './display-user-tickets.component.html',
  styleUrl: './display-user-tickets.component.css'
})
export class DisplayUserTicketsComponent {
  constructor(private route: ActivatedRoute) {}

  ticketService = inject(TicketsService);
  authService = inject(AuthService);
  router = inject(Router);
  display_tickets = signal<Array<Ticket>>([]);
  this_ticket!: Ticket;

  ngOnInit(): void {
    this.authService.isLoggedIn();
    const type = this.route.snapshot.paramMap.get('user');
    console.log(type);

   this.ticketService.getTicketByUser().subscribe({
  next: (response) => {
    const tickets = response.body as Ticket[];
    if (type && ['open', 'closed', 'cancelled', 'onHold'].includes(type)) {
      const filtered = tickets.filter(t => t.status === type);
      this.display_tickets.set(filtered);
    } else {
      this.display_tickets.set(tickets);
    }
  },
  error: (err) => {
    if (err.status === 401) {
      alert("Session expired Login again to continue");
      this.router.navigate(['/']); // Session expired, redirect
    } else {
      alert("Error fetching user tickets.");
    }
  }
});

  }

  cancelTicket(tid: string): void {
    this.ticketService.getTicketById(tid).subscribe({
  next: (response) => {
    const ticket = response.body as Ticket;
    ticket.status = "cancelled";

    this.ticketService.updateTickets(tid, ticket).subscribe({
      next: () => {
        alert("Ticket Cancelled");
        this.ngOnInit();
      },
      error: (err) => {
        if (err.status === 401) {
          alert("Session expired Login again to continue");
          this.router.navigate(['/']);
        } else {
          alert("Error cancelling ticket.");
        }
      }
    });
  },
  error: (err) => {
    if (err.status === 401) {
      alert("Session expired Login again to continue");
      this.router.navigate(['/']);
    } else {
      alert("Error fetching ticket.");
    }
  }
});

  }
}
