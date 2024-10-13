import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';

const routes: Routes = [
 { path: '', 
    component: EventsComponent,
    children: [
  { path: 'display/:name', component: DisplayComponent },
  { path: 'list', component: EventsListComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
