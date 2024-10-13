import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  userUrl ='http://localhost:8222/auth/';

  constructor(private http:HttpClient) { }

  register(formData:FormData): Observable<any> {
    return this.http.post<any>(this.userUrl+'register',formData)
  }
  getUser(id:String): Observable<any> {
    return this.http.get<any>(this.userUrl+'currentUser/'+id)
  }
  

/************************* adds from eya  */
  affecterRoomTouser(idroom: number , iduser:number,points:number): Observable<any> {
    
    return this.http.put<any>(`${this.userUrl}affecterRoomToUser/${idroom}/${iduser}/${points}`, {} );
  }


  getRoomId(iduser:number): Observable<any> {
    
    return this.http.get<any>(`${this.userUrl}getRoomUser/${iduser}` );
  }


  getUserById(iduser:number): Observable<any> {
    
    return this.http.get<any>(`${this.userUrl}getUserById/${iduser}` );
  }

  
  UpdateUserPoints (iduser:number,points: number): Observable<any> 
  {
    return this.http.put<any>(`${this.userUrl}UpdateUserPoints/${iduser}/${points}`,{});
  
  }
  updateUserPointsWheneEnteringAuction (iduser:number,points: number): Observable<any> 
  {
    return this.http.put<any>(`${this.userUrl}updateUserPointsWheneEnteringAuction/${iduser}/${points}`,{});
  
  }

  RemoveUserRoom (iduser:number): Observable<any> 
  {
    return this.http.put<any>(`${this.userUrl}RemoveUserRoom/${iduser}`,{});
  
  }
  

  RembourssementPoints (iduser:number,points: number): Observable<any> 
  {
    return this.http.put<any>(`${this.userUrl}RembourssementPoints/${iduser}/${points}`,{});
  
  }
  

  getUsersByIdRoom(idRoom:number): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.userUrl}getUsersByIdRoom/${idRoom}` );
  }

  deleteImage(id:String) : Observable<Image>{
    return this.http.get<Image>("http://localhost:8222/authImage/delete/"+id)
  }
   upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post<any>("http://localhost:8222/authImage/upload", formData);
  }
  
}
