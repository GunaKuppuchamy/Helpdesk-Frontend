import { Component , inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';


/**
 * This component facilitates It team members to update the ticket status to onHold or close the ticket
 */
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
 
authService=inject(AuthService);
  ngOnInit(): void {
    this.ticketService.getTicketById(this.id).subscribe((ticket) => {
      this.this_ticket=ticket.body;
      console.log(this.id)
      console.log(this.this_ticket)
    })   
  }

/**
   * Update the current ticket's status to "onHold"
   * and save the change through the API.
   */
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

         error : (err) =>
            {
             if (!this.authService.sessionTimeout(err)) {
        alert("Error while editing")
      }
    }
      }
    );
     
}


/**
   * Update the current ticket's status to "closed"
   * and save the change through the API.
   */

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

           error : (err) =>
            {
              if (!this.authService.sessionTimeout(err)) {
        alert("Error while editing")
      }
    }
      }
    );

}

}
