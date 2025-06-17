import { Component,inject,OnInit,signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

/**
 * This Component displays Open and onHold Tickets which has passed the due date and has not been closed yet
 */

@Component({
  selector: 'app-it-overdue-ticket',
  imports: [CommonModule,RouterLink],
  templateUrl: './it-overdue-ticket.component.html',
  styleUrl: './it-overdue-ticket.component.css'
})
export class ItOverdueTicketComponent implements OnInit {

    ticketService = inject(TicketsService);
    authService = inject(AuthService);
    display_tickets = signal<Array<Ticket>>([]);
    router = inject(Router)
    today = new Date()
    

    ngOnInit(): void {
    
  this.ticketService.getTicketByIt().subscribe({
    next : (response) => {
    const filtered = (response.body || []).filter((t:Ticket) => {
      const dueDate = new Date(t.duedate);
      console.log('Due Date:', dueDate);
      console.log('Today:', this.today);
      console.log('Status:', t.status);

      return dueDate < this.today &&  t.status !== 'closed' && t.status !== 'cancelled';
    });

    this.display_tickets.set(filtered);
    console.log(this.display_tickets)
  },
  error : (err) =>
  {
     if (!this.authService.sessionTimeout(err)) {
      console.log("Error occured");
     }
  
  }
  }
);
    
}

    }


