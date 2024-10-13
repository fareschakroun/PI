import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  constructor(private http: HttpClient) {
    //this.initializeWebSocketConnection();
  }
  url = "http://localhost:8222/api/rooms/";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })
  };
  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }
  addRoom ( data: any )
  {
    return this.http.post<any>( this.url + "addRoom", data );
  }

  public getAllRooms (  ): Observable<any[]>
  {
    return this.http.get<any[]>( this.url + "getAllRooms" );
  }

  public getRoomById ( id: number ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }${ id }`, {
   
    } );
 
  }


  public getRoomPackages ( id: number ): Observable<object>
  {
    
    return this.http.get<any>( `${ this.url }getRoomPackages/${ id }`, {
   
    } );
 
  }

  UpdateRoom ( data: any  ): Observable<any> 
  {
    return this.http.put<any>( this.url + 'updateRoom', data );
  
  }
  
  

  ReservePack ( id: number, idRoom:number  ): Observable<any> 
  {
    return this.http.put<any>(`${this.url}ReservePack/${id}/${idRoom}`, {} );
  
  }

  updateRoomParticipant ( idRoom:number  ): Observable<any> 
  {
    return this.http.put<any>(`${this.url}updateRoomPaticipant/${idRoom}`, {} );
  
  }
  UpdatePriceAuction ( points: number,id:number  ): Observable<any> {
    return this.http.put<any>(`${this.url}updatePrice/${points}/${id}`, {});
  }
  updateRoomStatus ( id:number  ): Observable<any> {
    return this.http.put<any>(`${this.url}updateRoomStatus/${id}`, {});
  }

  

  addEnchere ( companyId: number,idroom:number  ): Observable<any> {
    return this.http.post<any>(`${this.url}addEncherForUser/${companyId}/${idroom}`,{});
  }


  updatePricingEnchere ( companyId: number,idroom:number ,points:number ): Observable<any> {
    return this.http.put<any>(`${this.url}updatePricing/${companyId}/${idroom}/${points}`,{});
  }
  ///////////////////////////////////////// Roulette
  
  SendRandomIndex ( idroom:number  ): Observable<any> {
    return this.http.put<any>(`${this.url}SendRandomIndex/${idroom}`,{});
  }
  ///////////////////////////////////////// Roulette

  getUserEnchere ( companyId: number,idroom:number): Observable<any> {
    return this.http.get<any>(`${this.url}getUserEnchere/${companyId}/${idroom}`,{});
  }


  getTopEncheresByRoomId (idroom:number): Observable<any> {
    return this.http.get<any>(`${this.url}getTopEncheresByRoomId/${idroom}`,{});
  }


  getUsersEnterningAuction (idroom:number): Observable<any> {
    return this.http.get<any>(`${this.url}getUsersEnterningAuction/${idroom}`,{});
  }
  findHighestPricedEnchereByRoomId (idroom:number): Observable<any> {
    return this.http.get<any>(`${this.url}findHighestPricedEnchereByRoomId/${idroom}`,{});
  }
  getCurrentUserBiding (idcompany:number,idroom:number): Observable<any> {
    return this.http.get<any>(`${this.url}getCurrentUserBiding/${idcompany}/${idroom}`,{});
  }
  deleteUserSortieEnchere ( idcompany: number ,idroom: number): Observable<any>
  {
   
    return this.http.delete(`${ this.url }deleteUserFromEnchere/${ idcompany }/${ idroom }` , {
      
    } );
 
  }
  private auctionEndedSource = new Subject<void>();

  auctionEnded$ = this.auctionEndedSource.asObservable();

  endAuction(): void {
    this.auctionEndedSource.next();
  }

  private stompClient!: Stomp.Client;
  private notificationsSubject = new Subject<Notification>();


  initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8083/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/api/rooms/topic/notifications', (message: any) => {
        if (message.body) {
          this.notificationsSubject.next(JSON.parse(message.body));
        }
      });
    });
  }
  getNotifications() {
    return this.notificationsSubject.asObservable();
  }
  connect(): Observable<any> {
    const socket = new SockJS('http://localhost:8083/ws');
    this.stompClient = Stomp.over(socket);

    return new Observable(observer => {
      this.stompClient.connect({}, frame => {
        observer.next(frame);
      });
    });
  }
  
  subscribeToPaymentNotifications(): Observable<any> {
    return new Observable(observer => {
      this.stompClient.subscribe('/api/rooms/topic/payment', message => {
        observer.next(message);
      });
    });
  }
}
