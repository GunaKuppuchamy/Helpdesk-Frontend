import { Routes } from '@angular/router';
import { DisplayUserTicketsComponent } from './user/display-user-tickets/display-user-tickets.component';
import { AddTicketComponent } from './user/add-ticket/add-ticket.component';
import { UserComponent } from './user/user/user.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { FaqComponent } from './home/faq/faq.component';
import { LandingpageComponent } from './home/landingpage/landingpage.component';

export const routes: Routes = [

    {
        path : 'login',
        loadComponent : () => {
            return import('./home/home/home.component').then((m)=>m.HomeComponent)
        }
    },

    {
        path : 'it-team',
        loadComponent : () => {
            return import('./it/it-team/it-team.component').then((m)=>m.ItTeamComponent)
        }
    },

    {
        path : 'it-overdue',
        loadComponent : () => {
            return import('./it/it-overdue-ticket/it-overdue-ticket.component').then((m)=>m.ItOverdueTicketComponent)
        }
    },

     {
        path : 'it-all',
        loadComponent : () => {
            return import('./it/it-all-tickets/it-all-tickets.component').then((m)=>m.ItAllTicketsComponent)
        }
    },

     {
        path : 'it-my',
        loadComponent : () => {
            return import('./it/it-my-tickets/it-my-tickets.component').then((m)=>m.ItMyTicketsComponent)
        }
    },

     {
        path : 'edit-ticket/:id',
        loadComponent : () => {
            return import('./it/edit-ticket/edit-ticket.component').then((m)=>m.EditTicketComponent)
        }
    },
  { path: 'displayUserTickets/:user', component: DisplayUserTicketsComponent },
  { path: 'addTicket', component: AddTicketComponent },
  { path: 'user', component:UserComponent},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: '',component:LandingpageComponent},
  { path: 'faq', component:FaqComponent},
  {
        path:'admin',
        loadComponent:()=>{ return import('./admin/admin/admin.component').then((m)=>m.AdminComponent)}
    },

    {
        path:'adminViewUsers',
        loadComponent:()=>{ return import('./admin/admin-view-users/admin-view-users.component').then((m)=>m.AdminViewUsersComponent)}
    },
    {
        path:'adminViewTickets',
        loadComponent:()=>{ return import('./admin/admin-view-tickets/admin-view-tickets.component').then((m)=>m.AdminViewTicketsComponent)}
    },
    {
        path:'adminDashboard',
        loadComponent:()=>{ return import('./admin/admindashboard/admindashboard.component').then((m)=>m.AdmindashboardComponent)}
    },
    {
        path:'addUser',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)}
    },
    {
        path:'addUser/:id',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)}
    },

    {
        path : 'currentUser',
        loadComponent : () =>{
            return import('./home/current-user/current-user.component').then((m)=>m.CurrentUserComponent)
        }
    }

];
