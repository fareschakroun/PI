import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interested } from 'src/app/models/Interested';
import { Event } from 'src/app/models/event';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit{

  
  userId=1
  myInteresetList:Interested[]=[]
  constructor(
    private router: Router,
    private acr: ActivatedRoute,
    private eventService: EventServiceService
   ){
  }
  eventList : Event[] =[]
  ngOnInit(): void {
    
    this.fetchEvents();
    
    throw new Error('Method not implemented.');
  }

  fetchEvents(){
    this.eventService.getAllEvents().subscribe((data)=>
      { 
        this.eventService.getUserInterest(this.userId).subscribe((list)=>{
          console.log(list)
          this.myInteresetList=list
        })
        this.eventList=data;
        
      }
    )
  }

  addInterest(event:Event){
    console.log("")
    this.eventService.addInterest(this.userId,event.id).subscribe((data)=>
  {
    
    
    this.myInteresetList.push(data)
    event.interestedCounter+=1
    this.isEventInList(event.id)
  }
      );
 
 
  }
  removeInterest(event:Event){
    console.log("")
    if (this.isEventInList(event.id))
    {
      this.eventService.deleteInterestByUserByEvent(this.userId,event.id).subscribe((data)=>
      {
        console.log( this.eventList[this.eventList.findIndex((ele)=>ele.id==event.id)])
        console.log(data)
        this.eventList[this.eventList.findIndex((ele)=>ele.id==event.id)]=data
    
      });
      console.log("Removed Interest")

    }
    else
    {
      this.addInterest(event)
      console.log("Added Interest")

    }
    
    
  }
  isEventInList(eventId: number): boolean {
    if( this.myInteresetList.length==0)
    return false;
    return this.myInteresetList.findIndex((event) => event.eventID === eventId) !== -1;
  }


}
