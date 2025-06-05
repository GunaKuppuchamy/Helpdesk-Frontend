export type Ticket = {
  tid?: string;           
  category: string;
  subject : string;
  description: string;
  status: 'open' | 'onHold' | 'closed';
  priority: 'low' | 'medium' | 'high';
  raisedById: string;     
  assignedToId: string;  
  dueDate: Date;
  createdDate?: Date;     
}
