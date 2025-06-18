import { Injectable,inject } from '@angular/core';
import { Users } from '../models/users';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http=inject(HttpClient)
  constructor() { }


private apiUrl='http://localhost:3002'



getUsersApi() 
{
  return this.http.get<Array<Users>>(`${this.apiUrl}/getUsers`,{withCredentials:true,observe : 'response'});
}

addUser(user : Users): Observable<any>
{
  return this.http.post(`${this.apiUrl}/addemp`,user,{withCredentials:true,observe : 'response'});
}

UpdateUser(id:string,data:Users)
{
  return this.http.put(`${this.apiUrl}/updateUser/${id}`,data,{withCredentials:true , observe : 'response'});
}

getUserById(id : string) : Observable<any>
{
  return this.http.get(`${this.apiUrl}/getUserByID/${id}`,{withCredentials : true , observe : 'response'});
}

deleteUserById(id : string)
{
  return this.http.delete(`${this.apiUrl}/deleteUser/${id}`,{withCredentials : true , observe : 'response'});
}

// private currentUser: any = null;

// setCurrentUser(user: any) {
//   this.currentUser = user;
// }

// getCurrentUser(): Observable<any> {
//   if (this.currentUser) {
//     return of(this.currentUser);
//   }

//   return this.http.get(`${this.apiUrl}/currentUser`, { withCredentials: true });
// }


}
