import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  UsersData: Users[] = [
  {
    user_id: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password_hash: '$2a$10$abcdefgh1234567890ijklmnopqrstuv',
    role: 'user',
    BU: 'DEX',
    created_at: new Date('2024-03-10'),
    status: 'Active',
    phNumber: 9876543210
  },
  {
    user_id: 'U002',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    password_hash: '$2a$10$abcdef1234567890ghijklmnopqrstuv',
    role: 'IT_team',
    BU: 'IT',
    created_at: new Date('2024-04-15'),
    status: 'Active',
    phNumber: 9123456780
  },
  {
    user_id: 'U003',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    password_hash: '$2a$10$abc1234567890defghijklmnopqrstuv',
    role: 'user',
    BU: 'DATA',
    created_at: new Date('2024-05-01'),
    status: 'Inactive',
    phNumber: 9988776655
  },
  {
    user_id: 'U004',
    name: 'Diana Lee',
    email: 'diana.lee@example.com',
    password_hash: '$2a$10$xyz9876543210abcdefghijklmno',
    role: 'user',
    BU: 'HR',
    created_at: new Date('2024-02-20'),
    status: 'Active',
    phNumber: 9090909090
  },
  {
    user_id: 'U005',
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    password_hash: '$2a$10$mnopqr1234567890stuvwxabcdefghij',
    role: 'IT_team',
    BU: 'IT',
    created_at: new Date('2024-01-05'),
    status: 'Active',
    phNumber: 9008007006
  }
];

}
