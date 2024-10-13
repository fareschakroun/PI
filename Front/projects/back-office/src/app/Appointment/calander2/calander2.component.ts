import { Component,ChangeDetectionStrategy, OnInit, ElementRef, ViewChild, AfterViewInit  } from "@angular/core";

import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Appointement, calenderEvent } from "../../models/appointement";
import { Appointement2 } from "../../models/appointement2";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ClassroomService } from "../../services/classroom.service";
import Swal from "sweetalert2";
import {  Router } from '@angular/router';

@Component({
  selector: 'app-calander2',
  templateUrl: './calander2.component.html',
  styleUrls: ['./calander2.component.css'],
 
})



export class Calander2Component implements OnInit,AfterViewInit{

  
  public value: Date;
  public format = 'MM/dd/yyyy HH:mm';

  userId:number=1
  AppoimentForm !:FormGroup;
  campaignOne !:FormGroup;
  campaignTwo !:FormGroup;
  Appointementslist : any[] =[]
  errorMessage: string;
  ngOnInit(): void {
// tjiib les Appointment mta3 les user connecter "getMyAppoitement"
    this.calendarservice.getMyAppoitement(this.userId).subscribe((data:any) => {
      
      this.Appointementslist=data ;
      console.log("INCOMING DATA")
      console.log(this.Appointementslist);
      this.addEvent();
    })
   
    const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });
    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19)),
    });
    // form groupe louttaneya 
    this.AppoimentForm=new FormGroup({
       
      eventName:new FormControl('',Validators.required),
      receiver:new FormControl('',Validators.required),
      startDate:new FormControl('',Validators.required),
      endDate:new FormControl('',Validators.required),
      // start: new Date(2024, 1, 29, 10, 30, 0),
      year:new FormControl('',Validators.required),
      month:new FormControl('',Validators.required),
      days:new FormControl('',Validators.required),
      hours:new FormControl('',Validators.required),
      minutes:new FormControl('',Validators.required)
 
    }
    )
  }



/* -------------------- Affichage time ------------------------------------- */
getYears(): number[] {
  const years = [];
  for (let year = 2024; year <= 2040; year++) {
    years.push(year);
  }
  return years;
}

getMonths(): number[] {
  return Array.from({ length: 12 }, (_, index) => index + 1);
}

getDays(): number[] {
  return Array.from({ length: 31 }, (_, index) => index + 1);
}

getHours(): number[] {
  return Array.from({ length: 24 }, (_, index) => index);
}

getMinutes(): number[] {
  return [0, 30];
}

/* ---------------------------------------------- */






  public showForms : boolean = false ;
  
  public data: any [] = [{
    id: 123,
    title: 'Test',
    start: new Date(2024, 1, 29, 10, 30, 0),
    end: new Date(2024, 1, 29, 15, 45, 0),
    isAllDay: false,
    sender:0,
    receiver:0
  },
  {
    id: 13256,
    title: 'Test2',
    start: new Date(),
    end: new Date(),
    isAllDay: false,
    sender:0,
    receiver:0
  }];

  // hedii ell calendar 
  calendarOptions: CalendarOptions = {
    // lib elii bech tessta3mallha 
    plugins: [timeGridPlugin,dayGridPlugin],
    initialView: 'timeGridWeek',
    weekends: false,
    // modi temp reel 
    editable:true,
    // les donne mte3ii
    events: 
      this.Appointementslist,
      eventClick:this.handleClick.bind(this) ,
      // les heures 
      slotLabelInterval: {
        hours: 1,
        minutes: 0,
      },
      slotDuration: {
        hours: 0,
        minutes: 10,
      },
    
  };
  showDelete: boolean= false ;
  deleteAppointment(){
    this.calendarservice.deleteAppointement(this.appointement.id).subscribe((data:any)=>{
      console.log(data)
    })
  }

/* --------------------Test meeting ------------------------- */

  OnlineMeeting(){

   
      this.router.navigate(['/OnlineMeeting',21]);
  
 

  }

  QuizTest(){

   
    this.router.navigate(['/quiz']);



}

/* ----------------------------------------------- */

  handleClick(event:EventClickArg){
    console.log(event)
    // event.event.setProp('title', 'abc');  
    const defIdNumber = parseInt(event.event._def.publicId);
    console.log("DEF ID NUMBER")
   
    this.appointement.id = defIdNumber
    console.log(this.appointement.id);
   
   
 
  if(this.showForms=== true)
  { this.showForms= false}  
  else {this.showForms = true}
  if(this.showDelete=== true)
  { this.showDelete= false}  
  else {this.showDelete = true}
}
// ajout lista mta3 event lel calendar 
// affectation mta3 les event fill calendrier 
addEvent() {
 
  console.log("adding this element "
   + this.Appointementslist)
  this.calendarOptions = {
    ...this.calendarOptions,
    events:
    this.Appointementslist

  };
 
}

randomfucnc(){
  
    
   
      // If the event spans multiple days, switch to full week view
      this.calendarOptions.initialView = 'timeGridWeek';
    
  }

  showForm(){
    if(this.showForms=== true)
    { this.showForms= false}  
    else {this.showForms = true}
  }
  public appointement : any = {
    id: 0,
    title: 'Test',
    start: new Date(2024, 1, 29, 10, 30, 0),
    end: new Date(2024, 1, 29, 15, 45, 0),
    isAllDay: false,
    sender:1,
    receiver:0,
    appointementType: "Reserved"

  }

 // condition 3all date 
 validateDate(control: AbstractControl): { [key: string]: any } | null {
  const year = control.get('year')?.value;
  const month = control.get('month')?.value;
  const days = control.get('days')?.value;

  const selectedDate = new Date(year, month - 1, days);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    return { 'pastDate': true };
  }

  return null;
}




  // ajoutii
  submit(){
    
      this.appointement.title = this.AppoimentForm.get('eventName').value
      this.appointement.receiver =this.AppoimentForm.get('receiver').value
      this.appointement.start =this.AppoimentForm.get('startDate').value
      this.appointement.end =this.AppoimentForm.get('endDate').value
      this.appointement.year=this.AppoimentForm.get('year').value
      this.appointement.days=this.AppoimentForm.get('days').value
      this.appointement.month=this.AppoimentForm.get('month').value
      this.appointement.hours=this.AppoimentForm.get('hours').value
      this.appointement.minutes=this.AppoimentForm.get('minutes').value
     this.appointement.start = new Date( this.appointement.year,this.appointement.month-1,this.appointement.days,this.appointement.hours,this.appointement.minutes,0)
     // Check if the selected date is before today's date
    

     const today = new Date();
   // comparii date louma walla le 
     if (this.appointement.start < today) {
       this.errorMessage = "Selected date cannot be before today's date";
       return;
     }
    
     console.log(this.appointement.id)
      //response hiya el besh tji mel base ba3d ma ta3mel ajout
      this.calendarservice.addAppointement(this.appointement).subscribe((response :any) =>{
        this.Appointementslist=[...this.Appointementslist,response]
        
        this.addEvent()
        console.log(this.appointement)
        console.log(response);

        // Assuming response.start is a Date object
        const startDate = new Date(response.start);

        // Extracting date and time parts
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(startDate.getDate()).padStart(2, '0');
        const hours = String(startDate.getHours()).padStart(2, '0');
        const minutes = String(startDate.getMinutes()).padStart(2, '0');
        const seconds = String(startDate.getSeconds()).padStart(2, '0');
        
        // Creating date and time strings
        const datePart = `${year}-${month}-${day}`;
        const timePart = `${hours}:${minutes}:${seconds}`;
        
        // Using the extracted parts in Swal.fire
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Appointment Added\nDate: ${datePart}\nTime: ${timePart}`,
          showConfirmButton: false,
          timer: 4000
                });
         
      },(error)=>{
        console.log(error)
      }
      )
      

  }
  addEventRapide(event:any){

  }
  @ViewChild('pickerInput') pickerInput: ElementRef;
  getDateFromPicker() {
    const selectedDate = this.pickerInput.nativeElement.value;
    console.log('Selected date:', selectedDate);
    // Perform further actions with the selected date
  }
  constructor(private calendarservice :ClassroomService, private router: Router ){}
  ngAfterViewInit(): void {
    const dateContainers = document.querySelectorAll('.input-container');

    dateContainers.forEach((dateContainer: Element) => {
      const dateInput = dateContainer.querySelector('.date-field') as HTMLInputElement | null;
    
      if (dateInput) {
        dateContainer.addEventListener('click', (event) => {
          dateInput.select();
        });
      }
    });
    
    /* ----------------------------------------------------------------------------- */
    /* -- Automatically set the date for check-in (today) and checkout (tomorrow) -- */
    /* ----------------------------------------------------------------------------- */
    
    document.addEventListener('DOMContentLoaded', () => {
      const dateCheckin = document.getElementById('date-checkin') as HTMLInputElement | null;
      const dateCheckout = document.getElementById('date-checkout') as HTMLInputElement | null;
    
      if (dateCheckin && dateCheckout) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
    
        dateCheckin.valueAsDate = today;
        dateCheckout.valueAsDate = tomorrow;
    
      
      }
    });    
  }
  showMeeting(){
    this.addEvent();

  }
// arja3 hounii 
// tchouf ell aw9aat les dispo 
  showAvailability(){
    this.calendarservice.showAvailability().subscribe((data)=>
    {   // hattina les date lii fill show free date ou hotthom fill element bech ell calendar ta3rfou 
      // sna3na list calenderEvent
        let list:calenderEvent[]=[]
        //for 3all data biin ell start will end ou mba3eed push 3all list 
          data.forEach(singleData => {
             let a:calenderEvent=new calenderEvent()
              a.start=new Date(singleData);
              a.end=new Date(a.start.getTime() + 30 * 60 * 1000)
              list.push(a)
          });
          
        console.log(list)
      this.calendarOptions = { 
        ...this.calendarOptions,
        events: list
    
      };
     
    })
  }

































































  
}
