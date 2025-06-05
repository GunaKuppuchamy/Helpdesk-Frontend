export type Ticket = {
  tid?: string;    
  subject:string;       
  category: string;
  
  description: string;
  status: 'open' | 'onHold' | 'closed'|'cancelled';
  priority: 'low' | 'medium' | 'high';
  raisedById: string;     
  assignedToId: string;  
  dueDate: Date;
  createdDate?: Date;     
}
