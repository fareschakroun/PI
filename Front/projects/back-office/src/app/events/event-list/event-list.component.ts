import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  myFilter: any = { name: '' };

  constructor(
    private router: Router,
    private acr: ActivatedRoute,
    private eventService: EventService
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
        this.eventList=data;
      }
    )
  }
  isSameDate(date1: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date();
  
    // Set time components to zero
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
  
    return d1.getTime() === d2.getTime();
  }

  navigateToPressene(id:number): void {
    this.router.navigate(['scan',id]);
  }

  navigateToUpdate(id:number): void {
    this.router.navigate(['create',id]);
  }
  navigateToDetail(id:string): void {
    this.router.navigate(['details',id]);
  }
}
