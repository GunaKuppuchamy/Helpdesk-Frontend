import { inject, Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  http=inject(HttpClient)

  constructor() { }

  private apiUrl = 'http://localhost:3002'
  getTicketAPI()
  {
  return this.http.get<Array<Ticket>>(`${this.apiUrl}/getticket`,{withCredentials:true,observe : 'response'});
  }

   addTicket(ticket: Ticket): Observable<any> {
    return this.http.post(`${this.apiUrl}/addticket`, ticket,{withCredentials : true,observe : 'response'});
  }
 
  getTicketByUser() : Observable<any>
  {
    //return this.http.get(`${this.apiUrl}/tickets/user`,{ withCredentials: true,observe : 'response' });
    return this.http.get(`${this.apiUrl}/tickets/user`,{ withCredentials: true,observe : 'response' });
  }
  
  getTicketById(tid : string) : Observable<any>
  {
    return this.http.get(`${this.apiUrl}/getTicket/${tid}`,{ withCredentials: true,observe : 'response' });
  }

  updateTickets(tid : string , data:Ticket) : Observable<any>
  {
    return this.http.put(`${this.apiUrl}/updateTicket/${tid}`,data,{withCredentials: true,observe: 'response'});
  }

  getTicketByIt() : Observable<any>
  {
    //return this.http.get(`${this.apiUrl}/tickets/it`,{withCredentials:true,observe:'response'});
    return this.http.get(`${this.apiUrl}/tickets/user`,{ withCredentials: true,observe : 'response' });
  }

}
