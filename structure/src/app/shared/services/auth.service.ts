import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users = [
    {
      id:1,
      name:'1',
      password:'1'
    },
    {
      id:2,
      name:'2',
      password:'2'
    }
  ];

  constructor() { }

  login(user){
    return new Promise((resolve, reject) => {
      resolve(this.users.some((u) => {
        return u.name === user.name && u.password === user.password;
      }));
    });
  }
}
