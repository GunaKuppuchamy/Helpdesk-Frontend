import { Injectable,inject } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http=inject(HttpClient)
  constructor() { }
  UsersData: Users[] = [
  {
    empid: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: '$2a$10$abcdefgh1234567890ijklmnopqrstuv',
    role: 'user',
    bu: 'DEX',
    phoneno: 9876543210
  },
  {
    empid: 'U002',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    password: '$2a$10$abcdef1234567890ghijklmnopqrstuv',
    role: 'IT_team',
    bu: 'IT',
    
    phoneno: 9123456780
  },
  {
    empid: 'U003',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    password: '$2a$10$abc1234567890defghijklmnopqrstuv',
    role: 'user',
    bu: 'DATA',
    phoneno: 9988776655
  },
  {
    empid: 'U004',
    name: 'Diana Lee',
    email: 'diana.lee@example.com',
    password: '$2a$10$xyz9876543210abcdefghijklmno',
    role: 'user',
    bu: 'HR',
    
    phoneno: 9090909090
  },
  {
    empid: 'U005',
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    password: '$2a$10$mnopqr1234567890stuvwxabcdefghij',
    role: 'IT_team',
    bu: 'IT',
    
    phoneno: 9008007006
  }
];

private apiUrl='http://localhost:3002'


getUsers()
  {
    return this.UsersData;
  }
 
  // getUserById(uid:string):Users
  // {
  //   const user = this.UsersData.find(u => uid === u.empid);
  //   if (!user) {
  //     throw new Error(`User with ID ${uid} not found`);
  //   }
  //   return user;
 
  // }

  // addUser(user :Users)
  // {
  //   this.UsersData.push(user);
  // }

  // deleteUserById(id:string)
  // {
  //   this.UsersData=this.UsersData.filter(u=>u.empid!==id);
  // }

  updateUserById(id:string, updatedData:Users)
  {
    const index=this.UsersData.findIndex(u=>u.empid===id);
    if(index!==-1)
    {
      this.UsersData[index]=updatedData;
    }
  }

getUsersApi() 
{
  return this.http.get<Array<Users>>(`${this.apiUrl}/getUsers`,{withCredentials:true});
}

addUser(user : Users): Observable<any>
{
  return this.http.post(`${this.apiUrl}/addemp`,user,{withCredentials:true});
}

UpdateUser(id:string,data:Users)
{
  return this.http.put(`${this.apiUrl}/updateUser/${id}`,data,{withCredentials:true});
}

getUserById(id : string) : Observable<any>
{
  return this.http.get(`${this.apiUrl}/getUserByID/${id}`);
}

deleteUserById(id : string)
{
  return this.http.delete(`${this.apiUrl}/deleteUser/${id}`);
}

getCurrentUser()
{
  return this.http.get(`${this.apiUrl}/getCurrentUser`,{withCredentials:true})
}
}
