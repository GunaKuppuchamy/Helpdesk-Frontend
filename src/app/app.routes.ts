import { Routes } from '@angular/router';


export const routes: Routes = [

    // login page
    {
        path : 'login',
        loadComponent : () => {
            return import('./home/home/home.component').then((m)=>m.HomeComponent)
        }
    },

    // it base
    {
        path : 'it-team',
        loadComponent : () => {
            return import('./it/it-team/it-team.component').then((m)=>m.ItTeamComponent)
        }
    },

    // it edits ticket
     {
        path : 'edit-ticket/:id',
        loadComponent : () => {
            return import('./it/edit-ticket/edit-ticket.component').then((m)=>m.EditTicketComponent)
        }
    },
 
    // user adds ticket
    { 
        path: 'addTicket', 
        loadComponent : () => {
                return import('./user/add-ticket/add-ticket.component').then((m)=>m.AddTicketComponent)
            }
    },

    // user base
    { path: 'user', 
        loadComponent : () => {
                return import('./user/user/user.component').then((m)=>m.UserComponent)
            }
    },

    //reset password if forgot
    { path: 'forgot-password',
        loadComponent : () => {
                return import('./home/forgot-password/forgot-password.component').then((m)=>m.ForgotPasswordComponent)
            }
    },

    // base page
    { path: '',
        loadComponent : () => {
                return import('./home/landingpage/landingpage.component').then((m)=>m.LandingpageComponent)
            }
    },

    // faq 
    { path: 'faq', 
    loadComponent : () => {
                return import('./home/faq/faq.component').then((m)=>m.FaqComponent)
            }
    },

    // admin base component
    {
        path:'admin',
        loadComponent:()=>{ return import('./admin/admin/admin.component').then((m)=>m.AdminComponent)}
    },

    // all user details
    {
        path:'adminViewUsers',
        loadComponent:()=>{ return import('./admin/admin-view-users/admin-view-users.component').then((m)=>m.AdminViewUsersComponent)}
    },

    //admin dashboard view
    {
        path:'adminDashboard',
        loadComponent:()=>{ return import('./admin/admindashboard/admindashboard.component').then((m)=>m.AdmindashboardComponent)}
    },

    //to add a new user
    {
        path:'addUser',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)}
    },

    //to edit existing user
    {
        path:'addUser/:id',
        loadComponent:()=>{ return import('./admin/add-user/add-user.component').then((m)=>m.AddUserComponent)}
    },

    
    // get current user details
    {
        path : 'currentUser',
        loadComponent : () =>{
            return import('./home/current-user/current-user.component').then((m)=>m.CurrentUserComponent)
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
