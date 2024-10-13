import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserSalmaService {

  private user: User = new User();
  
  constructor() { }
  
  getUser(): User {
    return this.user;
  }
}
