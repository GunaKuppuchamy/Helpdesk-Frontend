import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {
  ticketForm: FormGroup;

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

      const duedate = new Date();
      duedate.setDate(duedate.getDate() + daysToAdd);
      
      const newTicket = {
        ...this.ticketForm.value,
        userid: 'U001', // Replace with logged-in user ID
        itid: 'IT001',                            
      ticketid: Math.random().toString(36).slice(2, 9),    
        status: 'open',
        raiseddate: new Date(),
        duedate: duedate
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
