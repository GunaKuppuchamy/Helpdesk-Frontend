import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.type';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor() { }

  tickets: Array<Ticket> = [
    {
      tid: 't1',
      category: 'Hardware',
      subject: 'Laptop issue',
      description: 'Laptop not turning on even after charging. Screen remains black and no lights are visible.',
      status: 'open',
      priority: 'high',
      raisedById: 'U001',
      assignedToId: 'U002',
      dueDate: new Date('2025-06-10'),
      createdDate: new Date('2025-06-01')
    },
    {
      tid: 't2',
      category: 'Software',
      subject: 'Office install error',
      description: 'Error occurs while installing Microsoft Office 365 on Windows 11. Installer crashes at 75%.',
      status: 'onHold',
      priority: 'medium',
      raisedById: 'U003',
      assignedToId: 'U005',
      dueDate: new Date('2025-06-08'),
      createdDate: new Date('2025-06-02')
    },
    {
      tid: 't3',
      category: 'Network',
      subject: 'Wi-Fi down',
      description: 'Wi-Fi is not working in the 3rd floor conference room. Devices can see network but can’t connect.',
      status: 'open',
      priority: 'high',
      raisedById: 'U004',
      assignedToId: 'U005',
      dueDate: new Date('2025-06-07'),
      createdDate: new Date('2025-06-03')
    },
    {
      tid: 't4',
      category: 'Email',
      subject: 'Email receiving issue',
      description: 'User is unable to receive emails from external domains. Internal emails work fine.',
      status: 'open',
      priority: 'medium',
      raisedById: 'U001',
      assignedToId: 'U002',
      dueDate: new Date('2025-06-04'),
      createdDate: new Date('2025-06-01')
    },
    {
      tid: 't5',
      category: 'Access',
      subject: 'Finance dashboard access',
      description: 'User requires access to the finance analytics dashboard for reporting and audit purposes.',
      status: 'onHold',
      priority: 'low',
      raisedById: 'U004',
      assignedToId: 'U005',
      dueDate: new Date('2025-06-15'),
      createdDate: new Date('2025-06-04')
    }
  ];

  addTicket(ticket: Ticket) {
    ticket.tid = Math.random().toString(36).slice(2, 9);
    this.tickets.push(ticket);
  }

  getTicketsByUser(userId: string): Ticket[] {
    return this.tickets.filter(t => t.raisedById === userId);
  }

  cancelTicketById(ticketId:string )
  {
    const ticket=this.tickets.find(t=>t.tid===ticketId);
    if(ticket)
    {
      ticket.status='cancelled';
    }
  }

  
}
