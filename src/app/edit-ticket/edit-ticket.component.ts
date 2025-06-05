import { Component , inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../models/ticket.type';

@Component({
  selector: 'app-edit-ticket',
  imports: [RouterModule],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent implements OnInit {
  route=inject(ActivatedRoute)
  router=inject(Router)
  ticketService=inject(TicketsService);
  this_ticket !: Ticket;
 

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.this_ticket = this.ticketService.tickets.find(t => t.ticketid === id)!;
    }
  }
onHold()
{
    if(this.this_ticket)
    {
      this.this_ticket.status = "onHold"
    }

    const ind = this.ticketService.tickets.findIndex(t => t.ticketid === this.this_ticket.ticketid)
    console.log(this.ticketService.tickets[ind])
    if(ind !==-1)
    {
      this.ticketService.tickets[ind] = { ...this.this_ticket };
    }

     alert("Ticket upadted - onhold");
    console.log(this.this_ticket)
    this.router.navigate(['/it-my']);
}


close()
{
  if(this.this_ticket)
    {
      this.this_ticket.status = "closed"
    }

    const ind = this.ticketService.tickets.findIndex(t => t.ticketid === this.this_ticket.ticketid)
    console.log(this.ticketService.tickets[ind])
    if(ind !==-1)
    {
      this.ticketService.tickets[ind] = { ...this.this_ticket };
    }

     alert("Ticket upadted - closed");
    console.log(this.this_ticket)
    this.router.navigate(['/it-my']);

}

}
