import { ClassroomComponent } from "./Appointment/classroom/classroom.component";
import { AfficherClassroomComponent } from "./Appointment/afficher-classroom/afficher-classroom.component";
import { AddClassroomComponent } from "./Appointment/add-classroom/add-classroom.component";
import { UpdateClassroomComponent } from "./Appointment/update-classroom/update-classroom.component";
import { ChatbotComponent } from "./Appointment/chatbot/chatbot.component";
import { Calander2Component } from "./Appointment/calander2/calander2.component";
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { FullCalendarModule } from "@fullcalendar/angular";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {NativeDateAdapter} from '@angular/material/core';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormFieldModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OnlineMeetingComponent } from './Appointment/online-meeting/online-meeting.component';
import { RouterModule } from "@angular/router";
import { QuestionComponent } from './Appointment/question/question.component';
import { QuizComponent } from './Appointment/quiz/quiz.component';

import { QuestionListComponent } from './Appointment/question-list/question-list.component';
import { QuizListComponent } from './Appointment/quiz-list/quiz-list.component';
import { AddroulsComponent } from './Appointment/addrouls/addrouls.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SupplierComponent } from './supplier/supplier.component';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { BoothplacementComponent } from './boothplacement/boothplacement.component';
import { DragDropModule, CdkDrag } from '@angular/cdk/drag-drop';
import { DialogboxComponent } from './boothplacement/dialogbox/dialogbox.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SupplyRequestsDashboardComponent } from './supply-requests-dashboard/supply-requests-dashboard.component';

//import { TranslateModule } from '@ngx-translate/core';

import { MessagestestComponent } from './messagestest/messagestest.component';
import { NewsupplyrequestsdashboardComponent } from './newsupplyrequestsdashboard/newsupplyrequestsdashboard.component';
import { MatTableModule } from '@angular/material/table';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplyRequestDetailsComponent } from './supply-request-details/supply-request-details.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';




import { ClaimBackofficeComponent } from './claim-backoffice/claim-backoffice.component';
import { ListUsersComponent } from './list-users/list-users.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
//import { CardClassroomComponent } from './Appointment/card-classroom/card-classroom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CalenderComponent } from './Appointment/calender/calender.component';
import { EventsComponent } from './events/events.component';
import { ChartModule } from 'angular-highcharts';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventsStatsComponent } from './events/events/events-stats/events-stats.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDisplayComponent } from './events/event-display/event-display.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanPressenceComponent } from './events/scan-pressence/scan-pressence.component';
import { AfficherCandidatureOffreAdminComponent } from './offer/afficher-candidature-offre-admin/afficher-candidature-offre-admin.component';
import { StatAdminCandidatureComponent } from './stat/stat-admin-candidature/stat-admin-candidature.component';

//import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { AddPackComponent } from './PackManagementAdmin/add-pack/add-pack.component';
import { ViewPackComponent } from './PackManagementAdmin/view-pack/view-pack.component';
import { UpdatePackComponent } from './PackManagementAdmin/update-pack/update-pack.component';


import { HistoriquePacksComponent } from './PackManagementAdmin/historique-packs/historique-packs.component';
import { ViewRoomsComponent } from './RoomManagement/view-rooms/view-rooms.component';
import { DetailRoomComponent } from './RoomManagement/detail-room/detail-room.component';
import { PackSalesPerYearComponent } from './PackManagementAdmin/pack-sales-per-year/pack-sales-per-year.component';
import { AuctionComponent } from './auction/auction.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AfficherOfferAdminComponent } from './offer/afficher-offer-admin/afficher-offer-admin.component';



@NgModule({
  declarations: [
    StatAdminCandidatureComponent,
    AfficherCandidatureOffreAdminComponent,
    AddPackComponent,
    ViewPackComponent,
    UpdatePackComponent,
    HistoriquePacksComponent,
    
    DetailRoomComponent,
    PackSalesPerYearComponent,
    AuctionComponent,
    AppComponent,
  AfficherOfferAdminComponent,
   PaymentListComponent,
    SupplierComponent,
    NotificationComponent,
    BoothplacementComponent,
    DialogboxComponent,
    SupplyRequestsDashboardComponent,
    MessagestestComponent,
    NewsupplyrequestsdashboardComponent,
    SupplierDetailComponent,
    SupplyRequestDetailsComponent,
    AuthentificationComponent,
  
    
    EventsComponent,
    EventCreateComponent,
    EventsStatsComponent,
    EventListComponent,
    EventDisplayComponent,
    ListUsersComponent,
    ClassroomComponent,
    ClaimBackofficeComponent,
    AfficherClassroomComponent,
    AddClassroomComponent,
    UpdateClassroomComponent,
    ChatbotComponent,
    Calander2Component,
    OnlineMeetingComponent,
    QuestionComponent,
    QuizComponent,
    QuestionListComponent,
    QuizListComponent,
    AddroulsComponent,

    AfficherOfferAdminComponent,
    AfficherCandidatureOffreAdminComponent,
    StatAdminCandidatureComponent,
    AddPackComponent,
    ViewPackComponent,
    UpdatePackComponent,
    HistoriquePacksComponent,
    ViewRoomsComponent,
    DetailRoomComponent,
    PackSalesPerYearComponent,
    AuctionComponent,
    PaymentListComponent,
   
    ScanPressenceComponent,

   
  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IntlModule,
    LabelModule,
    ButtonsModule,
    DateInputsModule,
    FormFieldModule,
    //CalenderComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    //MatFormFieldModule,
    //MatInputModule,
    //MatAutocompleteModule,
    //MatSelectModule,
    NgbModule,
    //NgChartsModule,
    NgApexchartsModule,

    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    BrowserAnimationsModule,
    RouterModule,
    DragDropModule,
    CommonModule,
    MatDialogModule,
  
    MatButtonModule,
    MatIconModule,
    MatTableModule,
 
    MatTableModule,
    
   
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleModule ,
    ChartModule,
    NgbModule,
    ZXingScannerModule,
   
  ],


  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
