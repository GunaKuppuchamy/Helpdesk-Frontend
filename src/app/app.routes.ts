import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';


export const routes: Routes = [

    // login page
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

    // it base
    {
        path : 'it-team',
        loadComponent : () => {
            return import('./it/it-team/it-team.component').then((m)=>m.ItTeamComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },

    
    // it edits ticket
     {
        path : 'edit-ticket/:id',
        loadComponent : () => {
            return import('./it/edit-ticket/edit-ticket.component').then((m)=>m.EditTicketComponent)
        },
        canActivate : [authGuard],
        data : {role : 'it'}
    },
 
    // user adds ticket

  
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

    // all user details
    {
        path:'adminViewUsers',
        loadComponent:()=>{ return import('./admin/admin-view-users/admin-view-users.component').then((m)=>m.AdminViewUsersComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },
   
    {
        path:'adminDashboard',
        loadComponent:()=>{ return import('./admin/admindashboard/admindashboard.component').then((m)=>m.AdmindashboardComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },

    //to add a new user
    {
        path:'addUser',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },

    //to edit existing user
    {
        path:'addUser/:id',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)},
         canActivate : [authGuard],
        data : {role : 'admin'}
    },

    
    // get current user details
    {
        path : 'currentUser',
        loadComponent : () =>{
            return import('./home/current-user/current-user.component').then((m)=>m.CurrentUserComponent)
        },
          canActivate : [authGuard],
        // data : {role : 'admin'}
    },

    // get tickets based on role
    {
        path : 'ticketList/:role',
        loadComponent : () =>{
            return import('./ticket-list/ticket-list.component').then((m)=>m.TicketListComponent)
        },
        canActivate : [authGuard],
        data: { allowMultipleRoles: true }
    },

    //get tickets based on role and filters
    {
        path : 'ticketList/:role/:type',
        loadComponent : () =>{
            return import('./ticket-list/ticket-list.component').then((m)=>m.TicketListComponent)
        },
        canActivate : [authGuard],
        data: { allowMultipleRoles: true }
    }

];
