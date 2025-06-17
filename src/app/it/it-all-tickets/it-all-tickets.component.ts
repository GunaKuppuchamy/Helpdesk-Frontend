import { Component, inject, signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

/**
 * This component fetches all the ticket raised by the users from the database
 * The tickets dispalyed in this component can't be edited by the current looged in IT team member
 */
@Component({
  selector: 'app-it-all-tickets',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, HttpClientModule, RouterLink],
  templateUrl: './it-all-tickets.component.html',
  styleUrl: './it-all-tickets.component.css'
})
export class ItAllTicketsComponent {

  ticketService = inject(TicketsService);
  authService = inject(AuthService);
  display_tickets = signal<Array<Ticket>>([]);
  router = inject(Router)
  ngOnInit(): void {
    
    //this.authService.isLoggedIn();
    this.ticketService.getTicketAPI().subscribe({
      next: (response) => {
        this.display_tickets.set(response.body || []);
      },
      error: (err) => {
        if (!this.authService.sessionTimeout(err)) {
          alert('Something went wrong while submitting the ticket.');
        }
      }


    })
  }
  

}



