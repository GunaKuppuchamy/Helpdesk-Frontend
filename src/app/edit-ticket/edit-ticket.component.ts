import { Component , inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../models/ticket.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-ticket',
  imports: [RouterModule,RouterLink,CommonModule],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent implements OnInit {
  route=inject(ActivatedRoute)
  router=inject(Router)
  ticketService=inject(TicketsService);
  this_ticket !: Ticket;
  id : string= this.route.snapshot.paramMap.get('id') || '';
 

  ngOnInit(): void {
    
    this.ticketService.getTicketById(this.id).subscribe((ticket) => {
      this.this_ticket=ticket;
    })
      console.log(this.id)
    
  }
onHold()
{

    if(this.this_ticket)
    {
      this.this_ticket.status = "onHold"
    }


    this.ticketService.updateTickets(this.id,this.this_ticket).subscribe(
      {
        next :(upTicket) => {

             alert("Ticket Updated - onhold");
    console.log(upTicket)
    this.router.navigate(['/it-my']);
        },

        error : () =>
        {
          alert("Error occured while Updating");
        }
      }
    );
     
}


close()
{
  


  if(this.this_ticket)
    {
      this.this_ticket.status = "closed"
    }

  
    this.ticketService.updateTickets(this.id,this.this_ticket).subscribe(
      {
        next :(upTicket) => {

             alert("Ticket Updated - Closed");
    console.log(upTicket)
    this.router.navigate(['/it-my']);
        },

        error : () =>
        {
          alert("Error occured while Updating");
        }
      }
    );

}

}
