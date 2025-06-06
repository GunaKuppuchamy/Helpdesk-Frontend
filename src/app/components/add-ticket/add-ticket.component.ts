import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Ticket } from '../../models/ticket.type';

@Component({
  selector: 'app-add-ticket',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;
  
  all_tickets !: Ticket[]
  userservice=inject(UserServiceService);

  constructor(private fb: FormBuilder, private ticketService: TicketsService, private router: Router) {
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      categeory: ['', Validators.required],
      description: ['', Validators.required],
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
      let daysToAdd = 3; // default for low

      if (priority === 'high') {
        daysToAdd = 1;
      } else if (priority === 'medium') {
        daysToAdd = 2;
      }

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysToAdd);

      // Step 1: Get all IT members
      const itMembers = this.userservice.getUsers().filter(u => u.role === 'IT_team');

      // Step 2: Count tickets per IT member
      const ticketCounts: { [itid: string]: number } = {};
      for (let member of itMembers) {
        const count = this.ticketService.getTickets().filter(t => t.itid === member.empid).length;
        ticketCounts[member.empid] = count;
      }

      // Step 3: Find IT member with minimum assigned tickets
      const leastLoadedIT = Object.keys(ticketCounts).reduce((a, b) =>
        ticketCounts[a] <= ticketCounts[b] ? a : b
      );

      // Step 4: Create new ticket with assigned IT ID
      const newTicket = {
        ...this.ticketForm.value,
        userid: 'U001', // Replace with logged-in user
        itid: leastLoadedIT,
        status: 'open',
        raiseddate: new Date(),
        duedate: dueDate
      };
      this.ticketService.addTicket(newTicket).subscribe( {
        next: (ticket) => {
        console.log('Ticket added successfully!', ticket);
        this.router.navigate(['/displayUserTickets', 'all']);
      },
      error: (err) => {
        console.error('Error adding ticket', err);
        alert('Something went wrong while submitting the ticket.');
      }

      });
      this.router.navigate(['/displayUserTickets', 'all']);
    }
  }
}
