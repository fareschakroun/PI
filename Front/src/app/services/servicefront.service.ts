import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../models/Supplier';
import { Booth } from '../../../projects/back-office/src/app/models/Booth';
import { SupplierOffer } from '../models/SupplierOffer';
import { message } from '../models/Message';
@Injectable({
  providedIn: 'root'
})
export class ServicefrontService {

  SupplierUrl ='http://localhost:8222/api/supplyrequest'
  Notification_URL='http://localhost:8763/api/notifications'
  SupplierOfferSuggestion_URL = 'http://localhost:8222/api/SupplyOffer'
  chatUrl='http://localhost:8763'

  constructor(private http:HttpClient) { }
  getsupplier():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.SupplierUrl+'/allRequests')
  }
  addsupplier(supplier:Supplier):Observable<Supplier[]>{
    return this.http.post<Supplier[]>(this.SupplierUrl+'/addsupplierrequest',supplier)
  }
  deletesupplier(id : number):Observable<Supplier[]>{
    return this.http.delete<Supplier[]>(this.SupplierUrl+'/deletesupplierrequest/'+id)
  }
  
  upadatesupplier(id:number,supplier:Supplier):Observable<Supplier[]>
  {
  return this.http.put<Supplier[]>(this.SupplierUrl+'/modifysupplierrequest/'+id,supplier)
  }
  affectsupplierTorequest(idsupplier: number, idrequest: number): Observable<string> {
    return this.http.post<string>(`${this.SupplierUrl}/affectrequesttosupplier/${idsupplier}/${idrequest}`, {});
  }

  removeSupplierFromSupplyRequest(supplierid:number): Observable<string>
  {
    return this.http.post<string>(`${this.SupplierUrl}/RefuseSupplierRequest/${supplierid}`, {});
  }
  checkifReserved(booth:string):Observable<Boolean>{
    return this.http.get<Boolean>(`${this.SupplierUrl}/checkReserved/${booth}`)
  }
  affectBoothToExhibitor(boothname:string,exhibitorid:number): Observable<Booth>{
    return this.http.get<Booth>(`${this.SupplierUrl}/affectBoothToexhibitor/${boothname}/${exhibitorid}`)
  }

  findExhibitorIdByBooth(boothName:string): Observable<number>{
    return this.http.get<number>(`${this.SupplierUrl}/findExhibitorByBooth/${boothName}`)
  }
  findSupplierIdByBooth(boothName:string): Observable<number>{
    return this.http.get<number>(`${this.SupplierUrl}/findSupplierByBooth/${boothName}`)
  }
  ///
  public getNotificationCount(userId:number): Observable<number> {
    return this.http.get<number>(this.Notification_URL + '/count/'+userId);
  }
  
  markNotificationAsRead(userId:number)
  {
    return this.http.post(`${this.Notification_URL}/mark-as-read/${userId}`, {});
  }
  addNotification(userId:number)
  {
    return this.http.post(`${this.Notification_URL}/addNotification/${userId}`,{})
  }

  //////////////////
  public addSupplierOffer(supplyRequestOffer:SupplierOffer,SupplierId:number,SupplyRequestId:number): Observable<SupplierOffer> {
    return this.http.post<SupplierOffer>(`${this.SupplierOfferSuggestion_URL}/addSupplyRequestOffer/${SupplierId}/${SupplyRequestId}`,supplyRequestOffer)
  }


  /////////////

  public allSupplierOfferList(): Observable<any[]> {
    return this.http.get<any[]>(this.SupplierOfferSuggestion_URL + '/getAllSupplyRequests');
  }

  ///removing offer

  public removeOffer(userId:number,supplyrequestid:number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.SupplierOfferSuggestion_URL}/removeSupplyRequest/${userId}/${supplyrequestid}`);
  }

  getAllMessages(senderId:number,receiverId:number): Observable<message[]>{
    return this.http.get<message[]>(`${this.chatUrl}/getChatMessagesBySenderAndReceiver/${senderId}/${receiverId}`)
  }

  //admin suggestion 
  public AcceptAdminSuggestion(supplyRequestId:number,price:number): Observable<SupplierOffer> {
    return this.http.post<SupplierOffer>(`${this.SupplierOfferSuggestion_URL}/changeOfferPriceSuggestion/${supplyRequestId}/${price}`,{})
  }
}
