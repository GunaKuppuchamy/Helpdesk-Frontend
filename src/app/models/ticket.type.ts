export type Ticket = {
  ticketid?: string;    
  subject:string;       
  category: string;
  description: string;
  status: 'open' | 'onHold' | 'closed'|'cancelled';
  priority: 'low' | 'medium' | 'high';
  userid: string;     
  itid: string;  
  duedate: Date;
  raiseddate?: Date;     
}
