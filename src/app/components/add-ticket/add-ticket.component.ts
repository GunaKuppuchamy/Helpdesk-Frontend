import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-add-ticket',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {
  ticketForm: FormGroup;
  userservice=inject(UserServiceService);

  constructor(private fb: FormBuilder, private ticketService: TicketsService, private router: Router) {
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      categeory: ['', Validators.required],
      description: ['', Validators.required],
      priroty: ['medium', Validators.required]
    });
  }

  

  submitTicket() {
    if (this.ticketForm.valid) {

      const priority = this.ticketForm.value.priority;
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
      this.ticketService.addTicket(newTicket);
      this.router.navigate(['/displayUserTickets', 'all']);
    }
  }
}
