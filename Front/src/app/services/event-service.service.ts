import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { Comment, Comments, Event, Like, Rating } from '../models/event';
import { Interested } from "../models/Interested";
@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
    __URL = 'http://localhost:8091/api/Event'
    eventURL='/Events'
    interestURL='/Interest'
    ratingURL='/Rating'
    imageURL='/cloudinary'
    commentURL='/Comment'
    constructor(private http:HttpClient) { }
  //-------------------------------ADD EVENT ------------------------------------------
    addEvent(Event:Event,images:Image[],mainImage:Image):Observable<Event>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
      Event.images=images;
      Event.imageId=mainImage.id;
      Event.imageUrl=mainImage.imageUrl;
      Event.imageIdCloudinary=mainImage.imageId
      Event.createdAt=new Date();
      Event.lastModifiedAt=new Date();
      // paladin the user who created it
      //Event.setLastModified_by(event.getCreated_by());
      Event.viewsCounter=0;
      Event.interestedCounter=0;
      Event.rating=0;
      console.log(Event)
      return  this.http.post<Event>(this.__URL+this.eventURL+'/addEvent',Event)
  
    }
  
  //-----------------------------------Get ALL EVENTS--------------------------------------
  getAllEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.__URL+this.eventURL+'/Allevents')
  }
  //------------------------------------------------------------------------------------------
    //-----------------------------------Get ALL EVENTS--------------------------------------
    getClosestEvents():Observable<Event[]>{
      return this.http.get<Event[]>(this.__URL+this.eventURL+'/ClosestEvent')
    }
    //------------------------------------------------------------------------------------------
  //-----------------------------------Fetch EVENT--------------------------------------
  fetchEventById(id : number):Observable<Event>{
    return this.http.get<Event>(this.__URL+this.eventURL+'/fetchEventById/'+id)
  }
  fetchEventByName(name : string):Observable<Event>{
    return this.http.get<Event>(this.__URL+this.eventURL+'/fetchEventByName/'+name)
  }
  //------------------------------------------------------------------------------------------
    //-----------------------------------Rating / Comment / LIKES related URLS-------------------------------------
    // this does add / update on a rating nothing to change here
    addRating(Rating:Rating):Observable<Event>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
   
      return  this.http.post<Event>(this.__URL+this.ratingURL+'/addRating',Rating)
  
    }
    addComment(Comment:Comment):Observable<Comment>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
      return  this.http.post<Comment>(this.__URL+this.commentURL+'/addComment',Comment)
    }
    addCommentFirst(Comment:Comment):Observable<Comment[]>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
      return  this.http.post<Comment[]>(this.__URL+this.commentURL+'/addCommentFirst',Comment)
    }
    getEventComment(int:number):Observable<Comment[]>{
      return this.http.get<Comment[]>(this.__URL+this.commentURL+'/EventComment/'+int);
    }
    getFullComment(int:number):Observable<Comments[]>{
      return this.http.get<Comments[]>(this.__URL+this.commentURL+'/orderedEvent/'+int);
    }
    orderComments(comments: Comment[]): Comments[] {
      let mycomments: Comments[] = [];
      let maxniveau: number = 0;
  
      // Find the maximum level of comments
      for (let index = 0; index < comments.length; index++) {
        const element: Comment = comments[index];
        if (maxniveau < element.level)
          maxniveau = element.level;
      }
  
      // Helper function to recursively process comments at each level
      function processCommentsAtLevel(level: number, parentComments: Comments): void {
        let commentsAtLevel: Comments[] = [];
  
        for (let index = 0; index < comments.length; index++) {
          const element: Comment = comments[index];
          if (element.level === level && element.thread === parentComments.comment.id) {
            let subcomments: Comments = {
              level: level,
              comment: element,
              list: [],
              replying:false,
            };
            parentComments.list.push(subcomments);
            commentsAtLevel.push(subcomments);
          }
        }
  
        for (let i = 0; i < commentsAtLevel.length; i++) {
          processCommentsAtLevel(level + 1, commentsAtLevel[i]);
        }
      }
  
      // Process comments at level 0
      for (let index = 0; index < comments.length; index++) {
        const element: Comment = comments[index];
        if (element.thread === 0 && element.level === 0) {
          let trialcomments: Comments = {
            level: 0,
            comment: element,
            list: [],
            replying:false
          };
          mycomments.push(trialcomments);
          processCommentsAtLevel(1, trialcomments);
        }
      }
  
      mycomments.sort((a, b) => {
        if (b.comment.likesCount === a.comment.likesCount) {
          return a.comment.dislikesCount - b.comment.dislikesCount;
        }
        return b.comment.likesCount - a.comment.likesCount;
      });      return mycomments;
    }
    
    addLike(Like:Like):Observable<Comment>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
      return  this.http.post<Comment>(this.__URL+this.commentURL+'/addLike',Like)
    }
    removeLike(Like:Like):Observable<Comment>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
      return  this.http.post<Comment>(this.__URL+this.commentURL+'/removeLike',Like)
    }
  //-------------------------------- ------------------------------
     //----------------------------------Interested related URLS-------------------------------------
    // this does add / update on a rating nothing to change here
    addInterest(user:number,event:number):Observable<Interested>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
        console.log(this.__URL+this.interestURL+'/addInterest/'+user+'/'+event)
      return   this.http.get<Interested>(this.__URL+this.interestURL+'/addInterest/'+user+'/'+event )
  
    }

    deleteInterest(interest:Interested):Observable<Event>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
        console.log(this.__URL+this.interestURL+'/removeInterest/'+interest.id)
      return  this.http.delete<Event>(this.__URL+this.interestURL+'/removeInterest/'+interest.id )
  
    }
    deleteInterestByUserByEvent(user:number,event:number):Observable<Event>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
        console.log(this.__URL+this.interestURL+'/removeInterestByUserByEvent/'+user+"/"+event)
      return  this.http.delete<Event>(this.__URL+this.interestURL+'/removeInterestByUserByEvent/'+user+"/"+event)
  
    }
 
    getUserInterest(id:number):Observable<Interested[]>{
      //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
        console.log(this.__URL+this.interestURL+'/UserInterest/'+id)
      return  this.http.get<Interested[]>(this.__URL+this.interestURL+'/UserInterest/'+id )
  
    }

  //-------------------------------- ------------------------------
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
  //-------------------------------------------------------------
  
}
