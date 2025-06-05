import { Component,inject,signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-it-all-tickets',
  imports: [CommonModule,TableModule,ButtonModule],
  templateUrl: './it-all-tickets.component.html',
  styleUrl: './it-all-tickets.component.css'
})
export class ItAllTicketsComponent {

  
      ticketService = inject(TicketsService);
      display_tickets = signal<Array<Ticket>>([]);
      ngOnInit(): void {
          this.display_tickets.set(this.ticketService.tickets)
        console.log(this.display_tickets)
        
      }
  

}
