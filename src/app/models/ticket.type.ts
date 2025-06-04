export type Ticket = {
  tid?: string;           
  category: string;
  description: string;
  status: 'open' | 'inprogress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  raisedById: string;     
  assignedToId?: string;  
  dueDate?: Date;
  createdDate?: Date;     
}
