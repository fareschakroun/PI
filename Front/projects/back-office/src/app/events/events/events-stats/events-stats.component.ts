import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as highcharts from 'angular-highcharts';
import { EventService } from '../../../services/event.service';
import { Event, Interested } from '../../../models/event';
import { ChartserviceService } from '../../../services/chartservice.service';

@Component({
  selector: 'app-events-stats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.css']
})
export class EventsStatsComponent implements OnInit{
  eventList:Event[]=[]
  eventListFiltered:Event[]=[]
  Viewshigher=0;
  Interesthigher=0;
  Viewslower=0;
  Interestlower=0;
  createseries:any;
  interestedBys:Interested[]=[]
  interestnumbers:string[]=[]
  interestdata:number[][]=[]
  interestCountMap = new Map<string, number>()
  interestDataCounter: (string |number )[][]=[[], []];
  pressenceDataCounter: (string |number )[][]=[[],[],[],[]];
  totalsDataCounter:(string | number )[][]=[[],[]];
  myFilter: any = { name: '' };

  constructor(private eventService:EventService,private chartservice:ChartserviceService){}
  
  linechart = new highcharts.Chart({
    
  });
  columnchart = new highcharts.Chart({
    
  });
  barchart=new highcharts.Chart({
    
  })
  ngOnInit(): void {
    this.fetchEvents();
  }
 
 
  
  updatelinechart(){
     this.linechart= this.chartservice.ChartRecreate(this.linechart,'line',this.interestDataCounter[1],"mylinechart",
      this.interestDataCounter
      ) 
    
  }
  updatecolumnchart(series:any){
    this.columnchart= this.chartservice.ChartRecreateColumn(this.columnchart,'column',this.pressenceDataCounter,"mycolumnchart",series) 
   
 }
  updatebarchart(){
    this.barchart= this.chartservice.ChartRecreateBar(this.barchart,'bar',this.totalsDataCounter[1],"Total Data",
     this.totalsDataCounter
     ) 
   
 }
  linechartrecreate(){
    this.linechart = new highcharts.Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linelinechart'
      },
      xAxis: {
        categories: ['meh']
    },
      credits: {
        enabled: false
      },
      series: []
    });
  }
  columnchartrecreate(){
    this.columnchart = new highcharts.Chart({
      chart: {
        type: "column"
      },
      title: {
        text: "data"
      },
      xAxis: {
        categories:  ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United']
    },
    yAxis: {
      min: 0,
      title: {
          text: 'Presence'
      },
      stackLabels: {
          enabled: true
      }
  },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
      series: []
    });
  }


  fetchEvents(){
    this.eventService.getAllEvents().subscribe((data)=>
      {
        this.eventList=data;
        this.eventListFiltered=this.eventList
        this.createseries={type:'bar'}
        console.log(this.eventList)
      }
    )
  }

  populateEmptyfield(){
    for (let i = 0; i < this.interestDataCounter.length; i++) {
      for (let j = 0; j < this.interestDataCounter[i].length; j++) {
        const value= this.interestDataCounter[i][j]

        if (value === undefined || value === null || value === '' || (typeof value==='number' && isNaN(value)) ) {
          this.interestDataCounter[i][j] = 0;
        }
      }
    }
  }
  removeEmptyField() {
    let indexesToRemove: number[] = [];
    let allZeros :boolean
    // Iterate through the columns (starting from the third column)
    console.log(this.interestDataCounter[1].length)
    for (let j = 0; j < this.interestDataCounter[1].length; j++) {
       allZeros = true;
       console.log("Full lenght")

        console.log(this.interestDataCounter)
      // Check each row in the current column
      for (let i = 2; i < this.interestDataCounter.length; i++)
        {

        if (this.interestDataCounter[i][j] != 0 ) {
          allZeros = false;

        }
       
      }
      if (allZeros ) {
        indexesToRemove.push(j);
      }
      // If all values in the column are zero, mark it for removal
      
    }
  
    console.log("INDEXES TO REMOVE")
    console.log(indexesToRemove)
    console.log(this.interestDataCounter)
    // Remove the marked columns
    for (let k = indexesToRemove.length - 1; k >= 0; k--) {
      const indexToRemove = indexesToRemove[k];
      this.interestDataCounter[1].splice(indexToRemove, 1); // Remove from the header row
     // this.interestDataCounter[].splice(indexToRemove, 1);
      // Remove the entire column from each row
        for (let j=k;j<indexesToRemove.length;j++)
        {
          indexesToRemove[j]=indexesToRemove[j]-1
        }
      for (let l =2; l < this.interestDataCounter.length; l++) {
        this.interestDataCounter[l].splice(indexToRemove, 1);
      }
    }
  }
  
  sortData() {
    for (let i = 0; i < this.interestDataCounter[1].length; i++) {
      for (let j = 0; j < this.interestDataCounter[1].length - 1; j++) {
        // Compare adjacent elements and swap if they are in the wrong order
        if ((this.interestDataCounter[1][j] as string).localeCompare((this.interestDataCounter[1][j + 1] as string)) > 0) {
          const temp = this.interestDataCounter[1][j];
          this.interestDataCounter[1][j] = this.interestDataCounter[1][j + 1];
          this.interestDataCounter[1][j + 1] = temp;
          for (let k=2;k<this.interestDataCounter.length;k++)
          {
            const temp2 = this.interestDataCounter[k][j];
          this.interestDataCounter[k][j] = this.interestDataCounter[k][j + 1];
          this.interestDataCounter[k][j + 1] = temp2;
          }
        }
      }
    }
  }

  // Helper function to compare strings numerically
  

  countInterestedByPerDay(Event: Event) {
 
    this.interestedBys!=Event.interesteds
    const eventIndex=this.interestDataCounter[0].indexOf(Event.name);
    // Iterate through each InterestedBy
    this.interestDataCounter[eventIndex+2]=[];
    for (const interestedBy of Event.interesteds!) {
      // Get the date string in the format YYYY-MM-DD
  
      const dateString = interestedBy.timestamp.toLocaleString().split('T')[0]
      console.log(dateString) 
      let index = this.interestDataCounter[1].indexOf(interestedBy.timestamp.toLocaleString().split('T')[0]);
      
      // Update the count in the map
      if (index !== -1) {
        this.interestDataCounter[eventIndex+2][index]=+this.interestDataCounter[eventIndex+2][index]+1;
      } else {
        this.interestDataCounter[1].push(dateString);
        index = this.interestDataCounter[1].indexOf(dateString);
        this.interestDataCounter[eventIndex+2][index]=1;
      }
    }
    this.sortData()
    this.populateEmptyfield()
  }
  affectTotalsDataCounter(event:Event){
    const eventIndex=this.totalsDataCounter[0].indexOf(event.name);
   
    this.totalsDataCounter[1]=["Total Interest","Total Views"];
    this.totalsDataCounter.push();
    this.totalsDataCounter[eventIndex+2]=[event.interestedCounter,event.viewsCounter];

  }
  affectPressence(event:Event){
 
    let count:number=this.countPresenceNotInterested(event);
    const eventIndex=this.pressenceDataCounter[0].indexOf(event.name);
    this.pressenceDataCounter[1]=["Present Not Interested","Present Interested"]
    this.pressenceDataCounter[2][eventIndex]=count;
    this.pressenceDataCounter[3][eventIndex]=event.presences.length-count;
           
 
    
  }
  countPresenceNotInterested(event:Event):number{
    const presenceUserIds: number[] = event.presences?.map((presence) => presence.userId) || [];
const interestedUserIds: number[] = event.interesteds?.map((interested) => interested.userID) || [];

// Combine and find unique user IDs
const commonUserIds: number[] = presenceUserIds.filter((userId) => interestedUserIds.includes(userId));

// Output the result
console.log("Number of unique user IDs:", commonUserIds.length);
console.log("Unique User IDs:", commonUserIds);
return commonUserIds.length;
  }
  handleCheckboxChange(event:Event ): void {
    const index = this.interestDataCounter[0].indexOf(event.name);
    const eventId=event.name;
      // If checked, add event ID to the array
      if (index === -1) {
        // Line chart things
        this.interestDataCounter[0].push(eventId);
        console.log("Initial PUSH == " +this.interestDataCounter)
        this.countInterestedByPerDay(event);
        // bar total things
        this.totalsDataCounter[0].push(eventId);
        console.log("Initial PUSH == " +this.totalsDataCounter)
        this.affectTotalsDataCounter(event);
        //   column bar things
        this.pressenceDataCounter[0].push(eventId)
        this.affectPressence(event)
    } else {
      // If unchecked, remove event ID and all numbers to the right
      if (index !== -1) {
        // line chart things
        this.interestDataCounter[0].splice(index, 1);
        this.interestDataCounter.splice(index+2,1);
        console.log("THIS IS THE LIST WITH REMOVED ITEMS")
        console.log(this.interestDataCounter)
        this.removeEmptyField()
          // bar total things
          this.totalsDataCounter[0].splice(index, 1);
          this.totalsDataCounter.splice(index+2,1);
          this.pressenceDataCounter[0].splice(index, 1);
          this.pressenceDataCounter[2].splice(index, 1);
          this.pressenceDataCounter[3].splice(index, 1);
      }
    }
    this.updatelinechart()
    this.updatebarchart();
    console.log(this.pressenceDataCounter)
    let myobject:any[]=[]
    let notInterested:any={name:"Not Interested",data:[]}
    let semiInterested:any={name:"Interested",data:[]}
      for (let index = 0; index < this.pressenceDataCounter[0].length; index++) {
        notInterested.data.push(this.pressenceDataCounter[2][index])
        semiInterested.data.push(this.pressenceDataCounter[3][index])
      }
      myobject.push(notInterested)
      myobject.push(semiInterested)
    this.updatecolumnchart(myobject);
    console.log(this.interestDataCounter);
    
  }

    filterRateChangeASC(){
      this.eventListFiltered.sort((a,b)=> a.rating-b.rating)
    }
    
    filterRateChangeDesc(){
      this.eventListFiltered.sort((a,b)=> b.rating-a.rating)
    }


    filterViewsChangeASC(){
      this.eventListFiltered.sort((a,b)=> a.viewsCounter-b.viewsCounter)
    }
    
    filterViewsChangeDesc(){
      this.eventListFiltered.sort((a,b)=> b.viewsCounter-a.viewsCounter)
    }
    filterInterestChangeASC(){
      this.eventListFiltered.sort((a,b)=> a.interestedCounter-b.interestedCounter)
    }
    
    filterInterestChangeDesc(){
      this.eventListFiltered.sort((a,b)=> b.interestedCounter-a.interestedCounter)
    }

  resetFilter(){

    this.myFilter.name=''
    this.Interesthigher=0
    this.Interestlower=0
    this.Viewshigher=0
    this.Viewslower=0
    this.eventListFiltered=this.eventList;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
