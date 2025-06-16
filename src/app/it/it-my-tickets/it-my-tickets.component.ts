import { Component, inject, OnInit, signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';


/**
 * This Component displayes the ticket assigned to the currently looged in IT team member
 * They can edit the status of the ticket
 */
@Component({
  selector: 'app-it-my-tickets',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './it-my-tickets.component.html',
  styleUrl: './it-my-tickets.component.css'
})
export class ItMyTicketsComponent implements OnInit {
  authService = inject(AuthService);
  ticketService = inject(TicketsService);
  display_tickets = signal<Array<Ticket>>([]);

  currentview !: 'all' | 'onHold' | 'open' | 'closed';
  loggedInUserId: string = 'I408';
  router = inject(Router)

  setView(view: 'all' | 'onHold' | 'open' | 'closed') {
    this.currentview = view;
    this.filterTicket()
    console.log(this.currentview)
  }
  ngOnInit(): void {
    
    this.ticketService.getTicketByIt().subscribe({
      next: (response) => {
        console.log(response)
        console.log(response.status)


        this.display_tickets.set(response.body || []);

      },
      error: (err) => {
         if (!this.authService.sessionTimeout(err)) {
          alert('Something went wrong fetching tickets.');
        }
        console.log("Error Occured")
      }
    });
  

  }

  filterTicket() {

    if (this.currentview == 'all') {
      this.ticketService.getTicketByIt().subscribe({
        next: (response) => {
          console.log(response)
          console.log(response.status)

          if (Array.isArray(response.body)) {
            this.display_tickets.set(response.body);
            console.log("all" + this.display_tickets);
          } else {
            this.display_tickets.set([]);  // or handle error
          }
        },
        error: (err) => {
          if (!this.authService.sessionTimeout(err)) {
            alert('Something went wrong fetching tickets.');
          }
          console.log("Error Occured")
        }
      });
    }
    else {

      this.ticketService.getTicketByIt().subscribe({
        next: (response) => {

          console.log(response.body);
          const filtered = (response.body || []).filter((t: Ticket) => t.status === this.currentview);
          console.log(filtered)
          this.display_tickets.set(filtered);
          console.log("filtered" + this.display_tickets);
        },
        error: (err) => {
          console.error('Error occurred:', err);

          if (!this.authService.sessionTimeout(err)) {
            alert('Something went wrong fetching tickets.');
          }
        }
      });



    }
  }
}
