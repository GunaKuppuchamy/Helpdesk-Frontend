import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

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

getUsers()
  {
    return this.UsersData;
  }
 
  getUserById(uid:string):Users
  {
    const user = this.UsersData.find(u => uid === u.empid);
    if (!user) {
      throw new Error(`User with ID ${uid} not found`);
    }
    return user;
 
  }

  addUser(user :Users)
  {
    this.UsersData.push(user);
  }
}
