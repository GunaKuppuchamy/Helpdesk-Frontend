import { Routes } from '@angular/router';
import { DisplayUserTicketsComponent } from './components/display-user-tickets/display-user-tickets.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [

    {
        path : '',
        loadComponent : () => {
            return import('./components/home/home.component').then((m)=>m.HomeComponent)
        }
    },

    {
        path : 'it-team',
        loadComponent : () => {
            return import('./it-team/it-team.component').then((m)=>m.ItTeamComponent)
        }
    },

    {
        path : 'it-overdue',
        loadComponent : () => {
            return import('./components/it-overdue-ticket/it-overdue-ticket.component').then((m)=>m.ItOverdueTicketComponent)
        }
    },

     {
        path : 'it-all',
        loadComponent : () => {
            return import('./components/it-all-tickets/it-all-tickets.component').then((m)=>m.ItAllTicketsComponent)
        }
    },

     {
        path : 'it-my',
        loadComponent : () => {
            return import('./components/it-my-tickets/it-my-tickets.component').then((m)=>m.ItMyTicketsComponent)
        }
    },

     {
        path : 'edit-ticket/:id',
        loadComponent : () => {
            return import('./edit-ticket/edit-ticket.component').then((m)=>m.EditTicketComponent)
        }
    },
  { path: 'displayUserTickets/:type', component: DisplayUserTicketsComponent },
  { path: 'addTicket', component: AddTicketComponent },
  { path: 'user', component:UserComponent},
  {
        path:'admin',
        loadComponent:()=>{ return import('./admin/admin.component').then((m)=>m.AdminComponent)}
    },

    {
        path:'adminViewUsers',
        loadComponent:()=>{ return import('./components/admin-view-users/admin-view-users.component').then((m)=>m.AdminViewUsersComponent)}
    },
    {
        path:'adminViewTickets',
        loadComponent:()=>{ return import('./components/admin-view-tickets/admin-view-tickets.component').then((m)=>m.AdminViewTicketsComponent)}
    },
    {
        path:'adminDashboard',
        loadComponent:()=>{ return import('./components/admindashboard/admindashboard.component').then((m)=>m.AdmindashboardComponent)}
    },
    {
        path:'addUser',
        loadComponent:()=>{ return import('./components/add-user/add-user.component').then((m)=>m.AddUserComponent)}
    },
    {
        path:'addUser/:id',
        loadComponent:()=>{ return import('./components/add-user/add-user.component').then((m)=>m.AddUserComponent)}
    }

];
