import { Routes } from '@angular/router';


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

    //  {
    //     path : 'it-all',
    //     loadComponent : () => {
    //         return import('./it/it-all-tickets/it-all-tickets.component').then((m)=>m.ItAllTicketsComponent)
    //     }
    // },

    

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
    {
        path: 'displayUserTickets/:user',
        loadComponent : () => {
            return import('./user/display-user-tickets/display-user-tickets.component').then((m)=>m.DisplayUserTicketsComponent)
        }
    },
  
  { 
    path: 'addTicket', 
     loadComponent : () => {
            return import('./user/add-ticket/add-ticket.component').then((m)=>m.AddTicketComponent)
        }
},
  { path: 'user', 
    loadComponent : () => {
            return import('./user/user/user.component').then((m)=>m.UserComponent)
        }
},
  { path: 'forgot-password',
    loadComponent : () => {
            return import('./home/forgot-password/forgot-password.component').then((m)=>m.ForgotPasswordComponent)
        }
    },
  { path: '',
    loadComponent : () => {
            return import('./home/landingpage/landingpage.component').then((m)=>m.LandingpageComponent)
        }
},
  { path: 'faq', 
   loadComponent : () => {
            return import('./home/faq/faq.component').then((m)=>m.FaqComponent)
        }
},
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
    ,

    //get all tickets simply (admin)
    {
        path : 'ticketList',
        loadComponent : () =>{
            return import('./ticket-list/ticket-list.component').then((m)=>m.TicketListComponent)
        }
    },
    // get tickets based on role
    {
        path : 'ticketList/:role',
        loadComponent : () =>{
            return import('./ticket-list/ticket-list.component').then((m)=>m.TicketListComponent)
        }
    },

    //get tickets based on role and filters
    {
        path : 'ticketList/:role/:type',
        loadComponent : () =>{
            return import('./ticket-list/ticket-list.component').then((m)=>m.TicketListComponent)
        }
    }

];
