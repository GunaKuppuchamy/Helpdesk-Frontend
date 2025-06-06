export type Ticket = {
  _id : string;
  ticketid?: string;    
  subject:string;       
  categeory: string;
  
  description: string;
  status: 'open' | 'onHold' | 'closed'|'cancelled';
  priroty: 'low' | 'medium' | 'high';
  userid: string;     
  itid: string;  
  duedate: Date;
  raiseddate?: Date;     
}
