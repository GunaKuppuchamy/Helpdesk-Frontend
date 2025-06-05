import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketService: TicketsService, private router: Router) {
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['medium', Validators.required]
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

      const newTicket = {
        ...this.ticketForm.value,
        raisedById: 'U001', // Replace with logged-in user ID
        status: 'open',
        createdDate: new Date(),
        dueDate: dueDate
      };
      this.ticketService.addTicket(newTicket);
      this.router.navigate(['/displayUserTickets', 'all']);
    }
  }
}
