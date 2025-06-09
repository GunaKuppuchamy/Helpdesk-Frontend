import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Ticket } from '../../models/ticket.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ticket',
  imports: [ReactiveFormsModule,RouterLink, CommonModule],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;
  
  all_tickets !: Ticket[]
  userservice=inject(UserServiceService);

  constructor(private fb: FormBuilder, private ticketService: TicketsService, private router: Router) {
    this.ticketForm = this.fb.group({
      subject: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      categeory: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priroty: ['medium', Validators.required]
    });
  }
it_count ={}
  ngOnInit(): void {
      this.ticketService.getTicketAPI().subscribe((ticket) =>
      {
        this.all_tickets = ticket;
      })
      console.log(this.all_tickets)
  }
  

 submitTicket() {
  if (this.ticketForm.valid) {
    const priority = this.ticketForm.value.priroty;
    let daysToAdd = 3;

    if (priority === 'high') daysToAdd = 1;
    else if (priority === 'medium') daysToAdd = 2;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    // First: get IT team members
    this.userservice.getUsersApi().subscribe((users) => {
      const itMembers = users.filter((user: any) => user.role === 'it');

      // Second: get all tickets
      this.ticketService.getTicketAPI().subscribe((tickets) => {
        const ticketCounts: { [itid: string]: number } = {};

        for (let member of itMembers) {
          const count = tickets.filter(t => t.itid === member.empid).length;
          ticketCounts[member.empid] = count;
        }

        console.log("Ticket counts per IT member:", ticketCounts);

        const leastLoadedIT = Object.keys(ticketCounts).reduce((a, b) =>
          ticketCounts[a] <= ticketCounts[b] ? a : b
        );

        console.log("Least loaded IT member:", leastLoadedIT);

        // Create and add new ticket
        const newTicket = {
          ...this.ticketForm.value,
          ticketid: 'TKT' + Date.now() + Math.floor(Math.random() * 1000),
          userid: 'U001',
          itid: leastLoadedIT,
          status: 'open',
          raiseddate: new Date(),
          duedate: dueDate
        };

        this.ticketService.addTicket(newTicket).subscribe({
          next: (ticket) => {
            console.log('Ticket added successfully!', ticket);
            this.router.navigate(['/displayUserTickets', 'all']);
          },
          error: (err) => {
            console.error('Error adding ticket', err);
            alert('Something went wrong while submitting the ticket.');
          }
        });
      });
    });
  }
}




  

}
