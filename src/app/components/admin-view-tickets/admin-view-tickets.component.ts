import { Component, inject } from '@angular/core';
import { Ticket } from '../../models/ticket.type';
import { TicketsService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-view-tickets',
  imports: [CommonModule,TableModule,RouterLink],
  templateUrl: './admin-view-tickets.component.html',
  styleUrl: './admin-view-tickets.component.css'
})
export class AdminViewTicketsComponent {

  allTickets: Ticket[] = []; 
  filters: { [s: string]: any } = {};

  constructor(private ticketservice: TicketsService) {}

  ngOnInit() {
    //this.allTickets = this.ticketservice.getTickets();

    this.ticketservice.getTicketAPI().subscribe((ticket) =>{
      this.allTickets=ticket;
    }
    
    )
  }
}



