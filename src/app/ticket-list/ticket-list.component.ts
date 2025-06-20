import { Component, inject } from '@angular/core';
import { Ticket } from '../models/ticket';
import { AuthService } from '../services/auth-service.service';
import { TicketsService } from '../services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-ticket-list',
  imports: [CommonModule, TableModule, RouterLink],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {

  allTickets: Ticket[] = [];
  filteredTickets: Ticket[]=[];
  authservice=inject(AuthService);
  ticketservice=inject(TicketsService);
  router=inject(Router);
  route=inject(ActivatedRoute);

  isRole!:boolean;
  role:string|null=null;
  isType!:boolean;
  type:string|null=null;
  isUser!:boolean;
  isIt!:boolean;
  isOverdue!:boolean;

  ngOnInit() {


  this.route.paramMap.subscribe(params => {
    this.role = params.get('role');
    this.type = params.get('type');

    this.isRole = !!this.role;
    this.isType = !!this.type;

    this.isIt = this.role === 'it';
    this.isUser = this.role === 'user';
    this.isOverdue = this.type === 'overdue';

    this.filterTickets();
  });
}

filterTickets() {
  // All tickets (admin or it)
  if (this.role && !this.type) {
    this.ticketservice.getTicketAPI().subscribe({
      next: (response) => {
        this.filteredTickets = response.body || [];
      },
      error: (err) => {
        console.error("Error fetching all tickets", err);
      }
    });
    return;
  }

  // User or IT have all,open,close etc as type
  if ((this.type)) {
    this.ticketservice.getTicketByUser().subscribe({
      next: (response) => {
        const tickets = response.body as Ticket[];

        if (this.type === 'all') {
          this.filteredTickets = tickets;
        } 
        else if(this.type==='overdue' && this.isIt)
          {
            this.filteredTickets = tickets.filter((t:Ticket) => {
              const dueDate = new Date(t.duedate);
              const today=new Date();
              
              return dueDate < today &&  t.status !== 'closed' && t.status !== 'cancelled';
            });
            this.isOverdue=true;
          }
        else 
        {
          this.filteredTickets = tickets.filter(t => t.status === this.type);
        }
      },

      error: (err) => {
        if (!this.authservice.sessionTimeout(err)) {
          alert("Error fetching user tickets.");
        }
      }
    });
  }
}

cancelTicket(tid: string): void {
    this.ticketservice.getTicketById(tid).subscribe({
      next: (response) => {
        const ticket = response.body as Ticket;
        ticket.status = "cancelled";

        this.ticketservice.updateTickets(tid, ticket).subscribe({
          next: () => {
            alert("Ticket Cancelled");
            this.ngOnInit();
          },
          error: (err) => {
            if (!this.authservice.sessionTimeout(err)) {
              alert("Error cancelling ticket.");
            }
          }
        });
      },
      error: (err) => {
        if (!this.authservice.sessionTimeout(err)) {
          alert("Error fetching ticket.");
        }
      }
    });

  }

  backToPage()
  {
    if(this.isIt)
      this.router.navigate(['/it-team']);
    else if(this.isUser)
      this.router.navigate(['/user']);
    else
    this.router.navigate(['/admin']);
  }

}




 
  
 
 
 
