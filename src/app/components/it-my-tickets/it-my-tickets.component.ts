import { Component ,inject,signal} from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-it-my-tickets',
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './it-my-tickets.component.html',
  styleUrl: './it-my-tickets.component.css'
})
export class ItMyTicketsComponent {

  ticketService = inject(TicketsService);
    display_tickets = signal<Array<Ticket>>([]);
  all_tickets = this.ticketService.tickets
    currentview !: 'all'|'onHold'|'open'|'closed';
    loggedInUserId :string= 'U002';

    setView(view : 'all'|'onHold'|'open'|'closed' )
    {
      this.currentview = view;
      this.filterTicket()
    }
    ngOnInit(): void {
      const filtered = this.all_tickets.filter(t => t.assignedToId === this.loggedInUserId);
        this.display_tickets.set(filtered);
      console.log(this.display_tickets)
      console.log(this.currentview)
      
    }

    filterTicket()
    {
      if(this.currentview== 'all')
      {
        const filtered = this.all_tickets.filter(t => t.assignedToId === this.loggedInUserId);
        this.display_tickets.set(filtered);
      }
      else{
      const filtered = this.all_tickets.filter(t => t.status === this.currentview && t.assignedToId === this.loggedInUserId);
      this.display_tickets.set(filtered);
      }
      
      
    }

}
