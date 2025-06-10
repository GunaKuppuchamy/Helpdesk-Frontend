import { Component, inject } from '@angular/core';
import { Ticket } from '../../models/ticket.type';
import { TicketsService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-view-tickets',
  imports: [CommonModule,TableModule,RouterLink],
  templateUrl: './admin-view-tickets.component.html',
  styleUrl: './admin-view-tickets.component.css'
})
export class AdminViewTicketsComponent {

  allTickets: Ticket[] = []; 

  constructor(private ticketservice: TicketsService, private router : Router) {}

  ngOnInit() {
    //this.allTickets = this.ticketservice.getTickets();
 this.ticketservice.getTicketAPI().subscribe({
            next : (response) =>
            {
              this.allTickets = response.body || [];
            },
            error : (err) =>
            {
              if (err.status === 401) {
        this.router.navigate(['/']); 
      } else {
        alert('Something went wrong while submitting the ticket.');
      }
            }
          
            
          })
        
  }
}
