import { inject, Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  http=inject(HttpClient)

  constructor() { }

  tickets: Array<Ticket> = [
  {
    _id : 'rt45',
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
    _id : 'rt45',
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
    _id : 'rt45',
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
    _id : 'rt45',
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
    _id : 'rt45',
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


  // addTicket(ticket: Ticket) {
  //   ticket.tid = Math.random().toString(36).slice(2, 9);
  //   this.tickets.push(ticket);
  // }

  getTicketsByUser(userId: string): Ticket[] {
    return this.tickets.filter(t => t.userid === userId);
  }

  cancelTicketById(ticketId:string )
  {
    const ticket=this.tickets.find(t=>t.ticketid===ticketId);
    if(ticket)
    {
      ticket.status='cancelled';
    }
  }
getTickets()
{
  return this.tickets;
}


  private apiUrl = 'http://localhost:3002'
  getTicketAPI()
  {
  return this.http.get<Array<Ticket>>(`${this.apiUrl}/getticket`);
  }

   addTicket(ticket: Ticket): Observable<any> {
    return this.http.post(`${this.apiUrl}/addticket`, ticket);
  }

  getTicketByUser(userId:string) : Observable<any>
  {
    return this.http.get(`${this.apiUrl}/tickets/user/${userId}`);
  }
  
  getTicketById(tid : string) : Observable<any>
  {
    return this.http.get(`${this.apiUrl}/getTicket/${tid}`);
  }

  updateTickets(tid : string , data:Ticket) : Observable<any>
  {
    return this.http.put(`${this.apiUrl}/putby/${tid}`,data);
  }
}
