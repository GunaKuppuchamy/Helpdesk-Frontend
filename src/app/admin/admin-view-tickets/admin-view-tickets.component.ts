import { Component, inject } from '@angular/core';
import { Ticket } from '../../models/ticket.type';
import { TicketsService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-admin-view-tickets',
  imports: [CommonModule, TableModule, RouterLink, InputTextModule],
  templateUrl: './admin-view-tickets.component.html',
  styleUrl: './admin-view-tickets.component.css'
})
export class AdminViewTicketsComponent {

  allTickets: Ticket[] = [];
  filters: { [s: string]: any } = {};

  constructor(private ticketservice: TicketsService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.allTickets = this.ticketservice.getTickets();
    this.authService.isLoggedIn();
    this.ticketservice.getTicketAPI().subscribe({
      next: (response) => {
        this.allTickets = response.body || [];
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
          this.authService.isLoggedOut();

        } else {
          alert('Something went wrong while submitting the ticket.');
        }
      }


    })

  }
}



