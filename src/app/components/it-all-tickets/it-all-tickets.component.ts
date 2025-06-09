import { Component,inject,signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {  HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-it-all-tickets',
  standalone:true,
  imports: [CommonModule,TableModule,ButtonModule,HttpClientModule,RouterLink],
  templateUrl: './it-all-tickets.component.html',
  styleUrl: './it-all-tickets.component.css'
})
export class ItAllTicketsComponent {

  
      ticketService = inject(TicketsService);
      display_tickets = signal<Array<Ticket>>([]);
      ngOnInit(): void {
          //this.display_tickets.set(this.ticketService.tickets)
          this.ticketService.getTicketAPI().subscribe((ticket) => {
            this.display_tickets.set(ticket);
          })
        console.log(this.display_tickets)
        
      }
  

}
