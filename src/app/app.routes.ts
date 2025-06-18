import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';


export const routes: Routes = [

    {
        path : 'login',
        loadComponent : () => {
            return import('./home/home/home.component').then((m)=>m.HomeComponent)
        },
        canActivate : [loginGuard]
    },
    { path: 'forgot-password',
    loadComponent : () => {
            return import('./home/forgot-password/forgot-password.component').then((m)=>m.ForgotPasswordComponent)
        },
         canActivate : [loginGuard]
    },
  { path: '',
    loadComponent : () => {
            return import('./home/landingpage/landingpage.component').then((m)=>m.LandingpageComponent)
        },
         canActivate : [loginGuard]
    },
  { path: 'faq', 
   loadComponent : () => {
            return import('./home/faq/faq.component').then((m)=>m.FaqComponent)
        },
         canActivate : [loginGuard]
    },

    {
        path : 'it-team',
        loadComponent : () => {
            return import('./it/it-team/it-team.component').then((m)=>m.ItTeamComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },

    {
        path : 'it-overdue',
        loadComponent : () => {
            return import('./it/it-overdue-ticket/it-overdue-ticket.component').then((m)=>m.ItOverdueTicketComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },

     {
        path : 'it-all',
        loadComponent : () => {
            return import('./it/it-all-tickets/it-all-tickets.component').then((m)=>m.ItAllTicketsComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },

     {
        path : 'it-my',
        loadComponent : () => {
            return import('./it/it-my-tickets/it-my-tickets.component').then((m)=>m.ItMyTicketsComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },

     {
        path : 'edit-ticket/:id',
        loadComponent : () => {
            return import('./it/edit-ticket/edit-ticket.component').then((m)=>m.EditTicketComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },
    {
        path: 'displayUserTickets/:user',
        loadComponent : () => {
            return import('./user/display-user-tickets/display-user-tickets.component').then((m)=>m.DisplayUserTicketsComponent)
        },
        canActivate : [authGuard],
        data : {role : 'user'}
    },
  
  { 
    path: 'addTicket', 
     loadComponent : () => {
            return import('./user/add-ticket/add-ticket.component').then((m)=>m.AddTicketComponent)
        },
        canActivate : [authGuard],
        data : {role : 'user'}
},
  { path: 'user', 
    loadComponent : () => {
            return import('./user/user/user.component').then((m)=>m.UserComponent)
        },
         canActivate : [authGuard],
        data : {role : 'user'}
},
  
  {
        path:'admin',
        loadComponent:()=>{ return import('./admin/admin/admin.component').then((m)=>m.AdminComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },

    {
        path:'adminViewUsers',
        loadComponent:()=>{ return import('./admin/admin-view-users/admin-view-users.component').then((m)=>m.AdminViewUsersComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },
    {
        path:'adminViewTickets',
        loadComponent:()=>{ return import('./admin/admin-view-tickets/admin-view-tickets.component').then((m)=>m.AdminViewTicketsComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },
    {
        path:'adminDashboard',
        loadComponent:()=>{ return import('./admin/admindashboard/admindashboard.component').then((m)=>m.AdmindashboardComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },
    {
        path:'addUser',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },
    {
        path:'addUser/:id',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },

    {
        path : 'currentUser',
        loadComponent : () =>{
            return import('./home/current-user/current-user.component').then((m)=>m.CurrentUserComponent)
        },
         canActivate : [authGuard],
        data : {role : 'admin'}
    }

];
