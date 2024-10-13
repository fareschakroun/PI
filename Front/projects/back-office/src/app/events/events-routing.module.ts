import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventsStatsComponent } from './events/events-stats/events-stats.component';

const routes: Routes = [
  {
    path: '', 
    component: EventsComponent,
    children: [
      {path: 'create/:id', component: EventCreateComponent },
      {path: 'create', component: EventCreateComponent },
      {path: 'Eventlist', component: EventListComponent },
      {path: 'stats', component: EventsStatsComponent },
      
      { path: '', pathMatch: 'full', redirectTo: '/events/create' },
      { path: '**', component: EventCreateComponent },

    ]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
