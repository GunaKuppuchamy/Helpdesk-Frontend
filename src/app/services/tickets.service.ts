import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.type';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {


  tickets: Array<Ticket> = [
    {
      ticketid: 't1',
      categeory: 'Hardware',
      subject: 'Laptop issue',
      description: 'Laptop not turning on even after charging. Screen remains black and no lights are visible.',
      status: 'open',
      priroty: 'high',
      userid: 'U001',
      itid: 'U002',
      duedate: new Date('2025-06-10'),
      raiseddate: new Date('2025-06-01')
    },
    {
      ticketid: 't2',
      categeory: 'Software',
      subject: 'Office install error',
      description: 'Error occurs while installing Microsoft Office 365 on Windows 11. Installer crashes at 75%.',
      status: 'onHold',
      priroty: 'medium',
      userid: 'U003',
      itid: 'U005',
      duedate: new Date('2025-06-08'),
      raiseddate: new Date('2025-06-02')
    },
    {
      ticketid: 't3',
      categeory: 'Network',
      subject: 'Wi-Fi down',
      description: 'Wi-Fi is not working in the 3rd floor conference room. Devices can see network but can’t connect.',
      status: 'open',
      priroty: 'high',
      userid: 'U004',
      itid: 'U005',
      duedate: new Date('2025-06-07'),
      raiseddate: new Date('2025-06-03')
    },
    {
      ticketid: 't4',
      categeory: 'Email',
      subject: 'Email receiving issue',
      description: 'User is unable to receive emails from external domains. Internal emails work fine.',
      status: 'open',
      priroty: 'medium',
      userid: 'U001',
      itid: 'U002',
      duedate: new Date('2025-06-04'),
      raiseddate: new Date('2025-06-01')
    },
    {
      ticketid: 't5',
      categeory: 'Access',
      subject: 'Finance dashboard access',
      description: 'User requires access to the finance analytics dashboard for reporting and audit purposes.',
      status: 'onHold',
      priroty: 'low',
      userid: 'U004',
      itid: 'U005',
      duedate: new Date('2025-06-15'),
      raiseddate: new Date('2025-06-04')
    }
  ];

  getTickets()
  {
    return this.tickets;
  }

  addTicket(ticket: Ticket) {
    ticket.ticketid = Math.random().toString(36).slice(2, 9);
    this.tickets.push(ticket);
  }

  getTicketsByUser(userId: string): Ticket[] {
    return this.tickets.filter(t => t.userid === userId);
  }

  cancelTicketById(ticketid:string )
  {
    const ticket=this.tickets.find(t=>t.ticketid===ticketid);
    if(ticket)
    {
      ticket.status='cancelled';
    }
  }

  // private baseUrl = 'http://localhost:3002';
  // getAllTickets(): Observable<Ticket[]> {
  //   return this.http.get<Ticket[]>(`${this.baseUrl}/getticket`);
  // }

  // getTicketsByUser(userId: string): Observable<Ticket> {
  //    return this.http.get<Ticket>(`${this.baseUrl}/getby/${userId}`);
  // }

  // addTicket(ticket: Ticket): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/addticket`, ticket);
  // }

  // cancelTicketById(ticketicketid: string): Observable<any> {
  //   const updatedStatus = { status: 'cancelled' };
  //   return this.http.put(`${this.baseUrl}/putby/${ticketicketid}`, updatedStatus);
  // }
}
