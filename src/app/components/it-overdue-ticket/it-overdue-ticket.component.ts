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
    loggedInUserId : string = "U001"

    ngOnInit(): void {
  this.ticketService.getTicketByUser(this.loggedInUserId).subscribe((ticket: Ticket[]) => {
    const filtered = ticket.filter(t => {
      const dueDate = new Date(t.duedate);
      console.log('Due Date:', dueDate);
      console.log('Today:', this.today);
      console.log('Status:', t.status);

      return dueDate < this.today && t.userid === this.loggedInUserId && t.status !== 'closed';
    });

    this.display_tickets.set(filtered);
  });
}

        // const filtered = this.ticketService.tickets.filter( t => t.duedate < this.today && t.itid === this.loggedInUserId && t.status !== 'closed');
        // this.display_tickets.set(filtered)

    }


