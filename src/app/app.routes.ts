import { Routes } from '@angular/router';
import { DisplayUserTicketsComponent } from './components/display-user-tickets/display-user-tickets.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: 'displayUserTickets/:type', component: DisplayUserTicketsComponent },
  { path: 'addTicket', component: AddTicketComponent },
  { path: '', component:UserComponent}
];
