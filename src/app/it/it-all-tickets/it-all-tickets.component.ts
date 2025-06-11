import { Component, inject, signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';


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
    //this.display_tickets.set(this.ticketService.tickets)
    this.authService.isLoggedIn();
    this.ticketService.getTicketAPI().subscribe({
      next: (response) => {
        this.display_tickets.set(response.body || []);
      },
      error: (err) => {
        if (err.status === 401) {
                          alert("Session expired Login again to continue");
          this.router.navigate(['/login']);
          this.authService.isLoggedOut();

        } else {
          alert('Something went wrong while submitting the ticket.');
        }
      }


    })
  }
  //console.log(this.display_tickets)

}



