import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.type';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor() { }

  tickets : Array<Ticket> =[{

    
    tid: 't1',
    category: 'Hardware',
    description: 'Laptop not turning on',
    status: 'open',
    priority: 'high',
    raisedById: 'u101',
    assignedToId: 'u201',
    dueDate: new Date('2025-06-10'),
    createdDate: new Date('2025-06-01')
  },
  {
    tid: 't2',
    category: 'Software',
    description: 'Unable to install MS Office',
    status: 'inprogress',
    priority: 'medium',
    raisedById: 'u102',
    assignedToId: 'u202',
    dueDate: new Date('2025-06-08'),
    createdDate: new Date('2025-06-02')
  },
  {
    tid: 't3',
    category: 'Network',
    description: 'Wi-Fi not connecting in conference room',
    status: 'open',
    priority: 'high',
    raisedById: 'u103',
    assignedToId: 'u203',
    dueDate: new Date('2025-06-07'),
    createdDate: new Date('2025-06-03')
  },
  {
    tid: 't4',
    category: 'Email',
    description: 'Not receiving external emails',
    status: 'closed',
    priority: 'medium',
    raisedById: 'u104',
    assignedToId: 'u204',
    dueDate: new Date('2025-06-04'),
    createdDate: new Date('2025-06-01')
  },
  {
    tid: 't5',
    category: 'Access',
    description: 'Need access to finance dashboard',
    status: 'inprogress',
    priority: 'low',
    raisedById: 'u105',
    assignedToId: 'u205',
    dueDate: new Date('2025-06-15'),
    createdDate: new Date('2025-06-04')
  }]
}
