import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  http=inject(HttpClient)
  constructor() {
 
   
  }
 
 
private apiUrl = 'http://localhost:3002'
login(email:string, password:string):Observable<HttpResponse<any>> {
  return this.http.post(`${this.apiUrl}/login`, {email, password}, {observe: 'response'});
}
 
 
}