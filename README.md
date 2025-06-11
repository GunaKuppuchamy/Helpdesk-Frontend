# Helpdesk Ticketing System
### Helpdesk-Frontend
**1. Description**
  A full-stack web application designed to manage support tickets within an organization. It allows users to raise tickets, IT teams to resolve them, and admins to oversee the entire process efficiently.

**2. Features**
  * Login: JWT-based secure login system.
  * Raise Ticket: Users can raise new tickets describing their issues.
  * View Tickets:
  * View all tickets (Admin)
  * View assigned tickets (IT)
  * View personal tickets (User)
  * Update Ticket Status: IT members can update ticket status to "closed".
  * Email Notification: An email is sent to the user when their ticket is closed.
  * OTP for Password Reset: Users can request an OTP and reset their password securely.\

**3. Role-based Dashboard:**
  * User - Submit and track issues
  * IT - Resolve assigned tickets
  * Admin - Manage users and oversee tickets

**4. Usage**
  * A smart and interactive helpdesk platform for tracking organizational issues:
  * Login with your role
  * Submit tickets with required details
  * View, track, and update status
  * Reset your password using email-based OTP (if needed)

**5. File Structure**
src/
└── app/
    ├── admin/
    │   ├── admin/
    │   ├── add-user/
    │   ├── display-user/
    │   ├── ticket/
    │   └── dashboard/
    ├── user/
    │   ├── user/
    │   ├── add-ticket/
    │   └── display-user-tickets/
    ├── it/
    │   ├── it-team/
    │   ├── it-all-tickets/
    │   ├── it-my-tickets/
    │   └── it-overdue-tickets/
    └── home/
        ├── home/
        └── forgot-password/



  
**6. Run**
  * ng serve
