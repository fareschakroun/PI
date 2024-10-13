import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { DisplayComponent } from './display/display.component';
import { RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialListEventComponent } from './initial-list-event/initial-list-event.component';
import { CarouselModule } from '@coreui/angular';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    DisplayComponent,
    EventsListComponent,
    InitialListEventComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CarouselModule,
  ]
})
export class EventsModule { }
