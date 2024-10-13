import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class JwtClientService {
  

  constructor(private httpClient: HttpClient) { 
    this.tokenStr = 'Bearer '+localStorage.getItem('token') || '';
     this.isAuthenticated = this.tokenStr !== 'Bearer null' ;
   console.log(this.tokenStr);
  }

  private tokenStr: string ="";

  private isAuthenticated : boolean= false   ;
  public generateToken(request:any): Observable<string> {
    console.log(request);
    
    return this.httpClient.post<string>("http://localhost:8222/auth/token", request, {  responseType: 'text' as 'json' });
  }


  getToken(): string {
    return this.tokenStr;
  }
  setToken(token: string) {
    this.tokenStr = 'Bearer '+token;
    // Save the token to local storage
    localStorage.setItem('token', token);
    // Update authentication status
    this.isAuthenticated = true;
  }
  EmptyToken() {
  this.tokenStr = "Bearer ";
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Update authentication status
    this.isAuthenticated = false;
  }
  

  public welcome(token:any) {
    if (localStorage.getItem("token") == null)
     this.tokenStr = 'Bearer ' + token;
    
    const headers = new HttpHeaders().set('Authorization',  this.tokenStr);
    return this.httpClient.get<string>("http://localhost:8080/", {headers, responseType: 'text' as 'json' });
  }
  setAuthenticated(isAuth:boolean)  {
    this.isAuthenticated=isAuth;
  }
  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  

  getConnectedUser():User{
   return JSON.parse(localStorage.getItem("user"))
  }
}
