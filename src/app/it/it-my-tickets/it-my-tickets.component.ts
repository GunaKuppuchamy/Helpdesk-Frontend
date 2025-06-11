import { Component, inject, OnInit, signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-it-my-tickets',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './it-my-tickets.component.html',
  styleUrl: './it-my-tickets.component.css'
})
export class ItMyTicketsComponent implements OnInit {
  authService = inject(AuthService);
  ticketService = inject(TicketsService);
  router = inject(Router);

  display_tickets = signal<Ticket[]>([]);
  currentview!: 'all' | 'onHold' | 'open' | 'closed';
  loggedInUserId: string = 'I408';

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.fetchTickets(); // load all by default
  }

  setView(view: 'all' | 'onHold' | 'open' | 'closed') {
    this.currentview = view;
    this.filterTicket();
    console.log('Current View:', this.currentview);
  }

  fetchTickets() {
    this.ticketService.getTicketByIt().subscribe({
      next: (response) => {
        this.display_tickets.set(response.body || []);
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Session expired. Please login again.');
          this.authService.isLoggedOut();
          this.router.navigate(['/login']);
        } else {
          alert('Something went wrong while fetching tickets.');
        }
      }
    });
  }

  filterTicket() {
    this.ticketService.getTicketByIt().subscribe({
      next: (response) => {
        const tickets = response.body || [];
        if (this.currentview === 'all') {
          this.display_tickets.set(tickets);
        } else {
          const filtered = tickets.filter((t) => t.status === this.currentview);
          this.display_tickets.set(filtered);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Session expired. Please login again.');
          this.authService.isLoggedOut();
          this.router.navigate(['/login']);
        } else {
          alert('Something went wrong while filtering tickets.');
        }
      }
    });
  }
}
