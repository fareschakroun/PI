import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventServiceService } from 'src/app/services/event-service.service';
import { Event, Rating } from 'src/app/models/event';
import { Interested } from 'src/app/models/Interested';
import { Image } from '../../models/image';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit{
  rate:any
  event: Event = new Event;
  //idUser:any=1
  localImage:Image[]=[]
  interested:boolean=false;
  user!:User;
  interestedBy!:Interested
  constructor( 
    private router: Router,
    private acr: ActivatedRoute,
    private eventService: EventServiceService,
    private userService: UserService
    )
    {}

  ngOnInit(): void {
    
    this.user=JSON.parse(localStorage.getItem("user"))
    this.acr.params.subscribe(params => {
      this.fetchEvent(params['name']);
   
    })
   
   
  }

    fetchEvent(name:string){
      this.event.name=name 
      this.eventService.fetchEventByName(this.event.name).subscribe((result)=> {
        this.event= result;
        this.localImage=this.event.images;
     })
    } 
    

 
  // paladin
    ViewInterest(){
      console.log("")
      this.eventService.deleteInterest(this.interestedBy).subscribe((data)=>
      {

        this.event=data
        this.interested=false;
      }
      );
      
      console.log("Removed Interest")
    }

    disableRating(rating:Rating){
      rating.status="Declined"
      this.eventService.addRating(rating).subscribe((data)=>{
        this.event=data;
      })
    }
    enableRating(rating:Rating){
      rating.status="Accepted"
      this.eventService.addRating(rating).subscribe((data)=>{
        this.event=data;
      })
    }
}
