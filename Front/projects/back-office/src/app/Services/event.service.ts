import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, Presence } from '../models/event';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  __URL = 'http://localhost:8091/api/Event'
  eventURL='/Events'
  interestURL='/Interest'
  ratingURL='/Rating'
  imageURL='/cloudinary'
  presenceUrl='/Presence'
  user!:User
  constructor(private http:HttpClient) { }

//-------------------------------ADD EVENT ------------------------------------------
  addEvent(Event:Event,images:Image[],mainImage:Image):Observable<Event>{
    //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
    this.user=JSON.parse(localStorage.getItem("user"))
    Event.images=images;
    Event.imageId=mainImage.id;
    Event.imageUrl=mainImage.imageUrl;
    Event.imageIdCloudinary=mainImage.imageId
    Event.createdAt=new Date();
    Event.lastModifiedAt=new Date();
    
    // paladin the user who created it
    //Event.setLastModified_by(event.getCreated_by());
    Event.createdBy=this.user.id
    Event.viewsCounter=0;
    Event.interestedCounter=0;
    Event.rating=0;
    console.log(Event)
    return  this.http.post<Event>(this.__URL+this.eventURL+'/addEvent',Event)

  }
//------------------------------------------------------------------------------------
//-------------------------------Update EVENT ------------------------------------------
updateEvent(Event:Event,images:Image[],mainImage:Image,id:number):Observable<Event>{
  //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
  Event.images=images;
  Event.imageId=mainImage.id;
  Event.imageUrl=mainImage.imageUrl;
  Event.imageIdCloudinary=mainImage.imageId
  Event.id=id;
  Event.lastModifiedAt=new Date();
  // paladin the user who created it
  //Event.setLastModified_by(event.getCreated_by());
  console.log("SENDING THIS EVENT")
  console.log(Event)
  return  this.http.post<Event>(this.__URL+this.eventURL+'/addEvent',Event)

}
//------------------------------------------------------------------------------------
//-----------------------------------Get ALL EVENTS--------------------------------------
getAllEvents():Observable<Event[]>{
  return this.http.get<Event[]>(this.__URL+this.eventURL+'/Allevents')
}
//------------------------------------------------------------------------------------------
//-----------------------------------Fetch EVENT--------------------------------------
fetchEvent(id : number):Observable<Event>{
  return this.http.get<Event>(this.__URL+this.eventURL+'/fetchEventById/'+id)
}
//------------------------------------------------------------------------------------------

//--------------------------------Image related URLS ------------------------------
public list(): Observable<Image[]> {
  return this.http.get<Image[]>(this.__URL+this.imageURL + '/list');
}
public imagesForEvent(eventId : number): Observable<Image[]> {
  return this.http.get<Image[]>(this.__URL+this.imageURL + '/list/'+eventId);
}

public uploadForEvent(image: File,eventId:number): Observable<any> {
  const formData = new FormData();
  formData.append('multipartFile', image);
  return this.http.post<any>(this.__URL+this.imageURL + "/upload/"+eventId, formData);
}
public upload(image: File): Observable<any> {
  const formData = new FormData();
  formData.append('multipartFile', image);
  return this.http.post<any>(this.__URL+this.imageURL + "/upload", formData);
}

public delete(id: any): Observable<any> {
  return this.http.delete<any>(this.__URL+this.imageURL + `/delete/${id}`);
}
public addPresense(id: number,presence: Presence): Observable<Presence> {
  return this.http.post<Presence>(this.__URL+this.presenceUrl+'/addPresense/'+id,presence);
}
//-------------------------------------------------------------
}
