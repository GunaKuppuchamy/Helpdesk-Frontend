import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http=inject(HttpClient)
  constructor() { 
  }

private apiUrl = environment.apiUrl;
login(email:string, password:string):Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, {email, password},{withCredentials:true,observe: 'response'});
}

logout():Observable<any>{

  return this.http.post(`${this.apiUrl}/logout`,{},{withCredentials:true,observe: 'response'});
}



}
