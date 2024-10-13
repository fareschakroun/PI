import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { status, Supplier } from '../models/Supplier';
import { supplierUser } from '../models/SupplierUser';
import { Image, SupplyRequest } from '../models/SupplyRequest';
import { map } from 'rxjs';
import { Booth } from '../models/Booth';
import { BoothRepresentation } from '../models/BoothRepresentation';
import { SupplierOffer } from '../models/SupplierOffer';
import { message } from '../models/Message';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class ServicebackService {

  SupplierUrl ='http://localhost:8222/api/supplyrequest'

  BoothUrl ='http://localhost:8763/api/BoothAndSupplier'

  supplieruserUrl ='http://localhost:8763/api/Users'
  
  userUrl ='http://localhost:8222/auth/';

  sequenceUrl ='http://localhost:8763/api/sequence'
  
  __URL = 'http://localhost:8763/api/Event/cloudinary'

  Notification_URL='http://localhost:8763/api/notifications'
  SupplierOfferSuggestion_URL = 'http://localhost:8222/api/SupplyOffer'

  authUserUrl ='http://localhost:8222/auth'

  chatUrl='http://localhost:8763'

  constructor(private http:HttpClient) { }
/* 
  getSommeValueOf(list:any[], critiria:string, value:any){
let n=0
for(let i in list){
  if(list[i][critiria]==value){
    n++
  }
}
return n
  } */

  getsupplier():Observable<Supplier[]>{
   
    return this.http.get<Supplier[]>(this.SupplierUrl+'/allRequests');
  }
  getsupplierItemById(id:number):Observable<SupplyRequest>{
    return this.http.get<SupplyRequest>(this.SupplierUrl+'/SupplierRequestStatus/'+id)
  }
  addsupplier(supplier:SupplyRequest):Observable<SupplyRequest[]>{
    return this.http.post<SupplyRequest[]>(this.SupplierUrl+'/addsupplierrequest',supplier)
  }
  deletesupplier(id : number):Observable<Supplier[]>{
    return this.http.post<Supplier[]>(this.SupplierUrl+'/deletesupplierrequest/'+id,{})
  }

  upadatesupplier(id:number,supplier:Supplier):Observable<Supplier[]>
{
  return this.http.put<Supplier[]>(this.SupplierUrl+'/modifysupplierrequest/'+id,supplier)
}

getSupplierById(id: number): Observable<supplierUser> {

  return this.http.get<supplierUser>(`${this.SupplierUrl}/Supplierbyid/${id}`);
  
}
setRequestStatus(requestid: number,status:String): Observable<Supplier[]> {
  

  return this.http.post<Supplier[]>(`${this.SupplierOfferSuggestion_URL}/changeStatus/${requestid}/${status}`,{});
  
}
CheckStatusSupplyRequest(requestid: number): Observable<Supplier> {
  

  return this.http.get<Supplier>(`${this.SupplierOfferSuggestion_URL}/SupplierRequestStatus/${requestid}`);
  
}
////////////////////////////////////////////////////////////////BOOOOOOOOOOOOOOOOOOTHHHHHHHH/////////////////////////////////////////////////////////////////
AddBooth(booth:Booth):Observable<Booth[]>{
  return this.http.post<Booth[]>(this.BoothUrl+'/addBooth',booth)
}
  

getBooths():Observable<Booth[]>{
  return this.http.get<Booth[]>(this.BoothUrl+'/showallBooths')
}
getBoothRepresentation():Observable<BoothRepresentation[]>{
  return this.http.get<BoothRepresentation[]>(this.BoothUrl+'/showallBooths')
}

getAllUserSuppliers():Observable<supplierUser[]>{
  return this.http.get<supplierUser[]>(this.supplieruserUrl)
}

deleteBooth(booth : Booth):Observable<Booth[]>{
  return this.http.delete<Booth[]>(this.BoothUrl+'/deletebooth/'+booth.id)
}

affectSupplierTobooth(boothName : string,idSupplier:number):Observable<Booth[]>{
  return this.http.put<Booth[]>(this.BoothUrl+'/affectBoothToSupplier/'+boothName+'/'+idSupplier,{})
}

/////////////////////////Handling Booth sequences /////////////////////////////////
getBoothSequence(boothName: string):Observable<number>{
  return this.http.get<number>(this.sequenceUrl+'/getSequence/'+boothName)
}
incrementBoothSequence(boothName: string):Observable<number>{
  return this.http.post<number>(this.sequenceUrl+'/IncrementBoothSequence/'+boothName,{})
}

//-------------------------------- ------------------------------
  //--------------------------------Image related URLS ------------------------------
  public list(): Observable<Image[]> {
    return this.http.get<Image[]>(this.__URL + '/list');
  }
  public imagesForEvent(eventId : number): Observable<Image[]> {
    return this.http.get<Image[]>(this.__URL + '/list/'+eventId);
  }
  
  public uploadForEvent(image: File,eventId:number): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post<any>(this.__URL + "/upload/"+eventId, formData);
  }
  public upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post<any>(this.__URL + "/upload", formData);
  }
  
  public delete(id: any): Observable<any> {
    return this.http.delete<any>(this.__URL + `/delete/${id}`);
  }
  //-------------------------------------------------------------


  //////////////////ADMIN SETTING STATUS

  removeSupplierFromSupplyRequest(supplierid:number): Observable<string>
  {
    return this.http.post<string>(`${this.SupplierUrl}/RefuseSupplierRequest/${supplierid}`, {});
  }

  //-------------------------------supply request suppliers offers------------------------------

 public getSuppliersOffers(supplyRequestId:number):Observable<supplierUser[]>{
return this.http.get<supplierUser[]>(this.SupplierUrl + '/getAllSuppliersBySupplyRequest/'+supplyRequestId);
  }

  //////////////////Notifications
  public getNotificationCount(userId:number): Observable<number> {
    return this.http.get<number>(this.Notification_URL + '/count/'+userId);
  }
  
  markAsread(userId:number)
  {
    return this.http.post(`${this.Notification_URL}/markasread/${userId}`, {});
  }
//////////////////////
public getAllOfferForSupplyRequest(supplyRequestId:number):Observable<SupplierOffer[]> {
  return this.http.get<SupplierOffer[]>(`${this.SupplierOfferSuggestion_URL}/getSupplierOfferById/${supplyRequestId}`)
}

///////////////////////USER RELATED///////////////

getUserId(username:string):Observable<number>{
  return this.http.post<number>(`${this.authUserUrl}/currentUserId/${username}`,{})
}

getUser(id:String): Observable<any> {
  return this.http.get<any>(this.userUrl+'currentUser/'+id)
}

getAdmins():Observable<any[]> {
  return this.http.get<any[]>(this.userUrl+'admins')
}

/////Messaging

getAllMessages(senderId:number,receiverId:number): Observable<message[]>{
  return this.http.get<message[]>(`${this.chatUrl}/getChatMessagesBySenderAndReceiver/${senderId}/${receiverId}`)
}
getLastMessage(senderId:number,receiverId:number): Observable<message>{
  return this.http.get<message>(`${this.chatUrl}/getLastMessage/${senderId}/${receiverId}`)
}
AllMessages(): Observable<message[]>{
  return this.http.get<message[]>(`${this.chatUrl}/allChatMessages`)
}


/////
}
