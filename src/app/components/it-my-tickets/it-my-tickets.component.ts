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
  //all_tickets = this.ticketService.tickets
    currentview !: 'all'|'onHold'|'open'|'closed';
    loggedInUserId :string= 'I408';

    setView(view : 'all'|'onHold'|'open'|'closed' )
    {
      this.currentview = view;
      this.filterTicket()
    }
    ngOnInit(): void {
    
       this.ticketService.getTicketByIt(this.loggedInUserId).subscribe((ticket : Ticket[]) =>
      {
       
        this.display_tickets.set(ticket)
      }
       );
      console.log(this.display_tickets)
      console.log(this.currentview)
      
    }

    filterTicket()
    {
      
       if(this.currentview== 'all')
       {
           this.ticketService.getTicketByIt(this.loggedInUserId).subscribe((ticket : Ticket[]) =>
      {
        this.display_tickets.set(ticket)
      });
       }
       else{

       
       this.ticketService.getTicketByIt(this.loggedInUserId).subscribe((ticket : Ticket[]) =>
      {
        const filtered = ticket.filter(t => t.status == this.currentview)
        this.display_tickets.set(filtered)
      }
       );
    
      }
    }
}
