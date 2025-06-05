import { Component,inject,OnInit,signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-it-overdue-ticket',
  imports: [CommonModule],
  templateUrl: './it-overdue-ticket.component.html',
  styleUrl: './it-overdue-ticket.component.css'
})
export class ItOverdueTicketComponent implements OnInit {

    ticketService = inject(TicketsService);
    display_tickets = signal<Array<Ticket>>([]);
    today = new Date()
    loggedInUserId : string = "U002"

    ngOnInit(): void {
        const filtered = this.ticketService.tickets.filter( t => t.dueDate < this.today && t.assignedToId === this.loggedInUserId && t.status !== 'closed');
        this.display_tickets.set(filtered)

    }

}
