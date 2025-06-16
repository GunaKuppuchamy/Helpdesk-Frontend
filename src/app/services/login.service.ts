import { HttpClient} from '@angular/common/http';
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
login(email:string, password:string):Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, {email, password},{withCredentials:true,observe: 'response'});
}

logout():Observable<any>{

  return this.http.post(`${this.apiUrl}/logout`,{},{withCredentials:true,observe: 'response'});
}



}
