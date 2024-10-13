import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-initial-list-event',
  templateUrl: './initial-list-event.component.html',
  styleUrls: ['./initial-list-event.component.css']
})
export class InitialListEventComponent implements OnInit{

  eventList:Event[]=[]
  constructor(private eventService:EventServiceService){}
  ngOnInit(): void {

    //this.fetchInitialList()

  //   const orderedComments = this.eventService.orderComments([
  //     {
  //         id: 1,
  //         userID: 1,
  //         eventID: 1,
  //         likesCount: 0,
  //         dislikesCount: 0,
  //         thread: null,
  //         comment: "First comment",
  //         status: "active",
  //         datetime: new Date(),
  //         level: 0,likes:[]
  //     },
  //     {
  //         id: 2,
  //         userID: 2,
  //         eventID: 1,
  //         likesCount: 0,
  //         dislikesCount: 0,
  //         thread: 1,
  //         comment: "Reply to first comment",
  //         status: "active",
  //         datetime: new Date(),
  //         level: 1,likes:[]
  //     },
  //     {
  //         id: 3,
  //         userID: 3,
  //         eventID: 1,
  //         likesCount: 0,
  //         dislikesCount: 0,
  //         thread: null,
  //         comment: "Reply to reply",
  //         status: "active",
  //         datetime: new Date(),
  //         level: 0,likes:[]
  //     },
  //     {
  //         id: 4,
  //         userID: 3,
  //         eventID: 1,
  //         likesCount: 0,
  //         dislikesCount: 0,
  //         thread: 2,
  //         comment: "Reply to reply",
  //         status: "active",
  //         datetime: new Date(),
  //         level: 2,likes:[]
  //     }
  //     ,
  //     {
  //         id: 5,
  //         userID: 3,
  //         eventID: 1,
  //         likesCount: 0,
  //         dislikesCount: 0,
  //         thread: 4,
  //         comment: "Reply to reply",
  //         status: "active",
  //         datetime: new Date(),
  //         level: 3,likes:[]
  //     }
  // ]);
  
  // console.log(orderedComments);
  }

  fetchInitialList(){
   this.eventService.getClosestEvents().subscribe((data)=>{
    console.log(data)
    this.eventList=data
   })
  }


}
