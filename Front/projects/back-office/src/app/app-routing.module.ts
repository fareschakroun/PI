
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';

import { UpdateClassroomComponent } from './Appointment/update-classroom/update-classroom.component';
import { ChatbotComponent } from './Appointment/chatbot/chatbot.component';
import { Calander2Component } from './Appointment/calander2/calander2.component';

import { OnlineMeetingComponent } from './Appointment/online-meeting/online-meeting.component';
import { quartersInYear } from 'date-fns';
import { QuizComponent } from './Appointment/quiz/quiz.component';

import { QuestionListComponent } from './Appointment/question-list/question-list.component';
import { QuizListComponent } from './Appointment/quiz-list/quiz-list.component';
import { AddroulsComponent } from './Appointment/addrouls/addrouls.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './Appointment/classroom/classroom.component';
import { AfficherClassroomComponent } from './Appointment/afficher-classroom/afficher-classroom.component';
import { AddClassroomComponent } from './Appointment/add-classroom/add-classroom.component';
//import { CalenderComponent } from './Appointment/calender/calender.component';
import { EventsComponent } from './events/events.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventsStatsComponent } from './events/events/events-stats/events-stats.component';
import { EventDisplayComponent } from './events/event-display/event-display.component';
import { ScanPressenceComponent } from './events/scan-pressence/scan-pressence.component';

import { AfficherOfferAdminComponent } from './offer/afficher-offer-admin/afficher-offer-admin.component';
import { AfficherCandidatureOffreAdminComponent } from './offer/afficher-candidature-offre-admin/afficher-candidature-offre-admin.component';
import { StatAdminCandidatureComponent } from './stat/stat-admin-candidature/stat-admin-candidature.component';
import { SupplierComponent } from './supplier/supplier.component';
import { BoothplacementComponent } from './boothplacement/boothplacement.component';
import { DialogboxComponent } from './boothplacement/dialogbox/dialogbox.component';
import { SupplyRequestsDashboardComponent } from './supply-requests-dashboard/supply-requests-dashboard.component';
import { MessagestestComponent } from './messagestest/messagestest.component';
import { NewsupplyrequestsdashboardComponent } from './newsupplyrequestsdashboard/newsupplyrequestsdashboard.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplyRequestDetailsComponent } from './supply-request-details/supply-request-details.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ClaimBackofficeComponent } from './claim-backoffice/claim-backoffice.component';
import { AddPackComponent } from './PackManagementAdmin/add-pack/add-pack.component';
import { ViewPackComponent } from './PackManagementAdmin/view-pack/view-pack.component';
import { UpdatePackComponent } from './PackManagementAdmin/update-pack/update-pack.component';
import { HistoriquePacksComponent } from './PackManagementAdmin/historique-packs/historique-packs.component';
import { CommonModule } from '@angular/common';
import { ViewRoomsComponent } from './RoomManagement/view-rooms/view-rooms.component';
import { DetailRoomComponent } from './RoomManagement/detail-room/detail-room.component';
import { PackSalesPerYearComponent } from './PackManagementAdmin/pack-sales-per-year/pack-sales-per-year.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AuthGuard } from '../../../../src/app/auth.guard';

const routes: Routes = [ 
    { path: 'claims', component: ClaimBackofficeComponent },
      { path: 'list', component: ListUsersComponent ,canActivate: [AuthGuard]},
      { path: 'admin/offers', component: AfficherOfferAdminComponent ,canActivate: [AuthGuard]},
      { path: 'admin/offer/candidatures/:id', component: AfficherCandidatureOffreAdminComponent ,canActivate: [AuthGuard]},
      { path: 'admin/stat',component: StatAdminCandidatureComponent ,canActivate: [AuthGuard]},
      {path : 'supplier/:id',component: SupplierComponent,canActivate: [AuthGuard]},
      {path : 'supplier',component: SupplierComponent,canActivate: [AuthGuard]},
      {path : 'booth',component: BoothplacementComponent,canActivate: [AuthGuard]},
      {path : 'detail',component: SupplierDetailComponent,canActivate: [AuthGuard]},
      
      {path : 'message',component: MessagestestComponent,canActivate: [AuthGuard]},
      {path: 'dialog',
      component: DialogboxComponent
      ,canActivate: [AuthGuard]
    },
    {path: 'boothDashboard',
      component: SupplyRequestsDashboardComponent
      ,canActivate: [AuthGuard]
    },
    {path: 'newDashboard',
      component: NewsupplyrequestsdashboardComponent
      ,canActivate: [AuthGuard]
    },
    {path: 'supplyRequestDetails',
      component: SupplyRequestDetailsComponent
      ,canActivate: [AuthGuard]
    },
    {path: 'supplyRequestDetails/:id',
    component: SupplyRequestDetailsComponent
    ,canActivate: [AuthGuard]
  },
  {path: 'auth',
    component: AuthentificationComponent,
  }
    ,  
    { path: 'viewPack/detail/:id', component: UpdatePackComponent,canActivate: [AuthGuard] },
    { path: 'HistoriquePacks', component: HistoriquePacksComponent,canActivate: [AuthGuard] },
    { path: 'viewRooms', component: ViewRoomsComponent,canActivate: [AuthGuard] },
    { path: 'viewRooms/detailRoom/:id', component: DetailRoomComponent,canActivate: [AuthGuard] },
    { path: 'packSalesPerYear', component: PackSalesPerYearComponent,canActivate: [AuthGuard] },
    { path: 'checkPayments', component: PaymentListComponent ,canActivate: [AuthGuard]}, 
    { path: 'classrooms', component: AfficherClassroomComponent ,canActivate: [AuthGuard]},
    {path: 'addclassroom', component: AddClassroomComponent ,canActivate: [AuthGuard]},
    // {path: 'calender', component: CalenderComponent },
    {path: 'addclassroom/:id', component:AddClassroomComponent,canActivate: [AuthGuard] },
    {path: 'chatBot', component:ChatbotComponent ,canActivate: [AuthGuard]},
    {path: 'calander2', component:Calander2Component ,canActivate: [AuthGuard] },
    {path: 'OnlineMeeting/:idroom', component:OnlineMeetingComponent ,canActivate: [AuthGuard] },
    {path: 'quiz', component:QuizComponent  ,canActivate: [AuthGuard]},
    {path: 'listequiz', component:QuizListComponent  ,canActivate: [AuthGuard]},
    {path: 'listequestion', component: QuestionListComponent ,canActivate: [AuthGuard]},
    {path: 'addroule', component: AddroulsComponent ,canActivate: [AuthGuard]},

//{path: 'calender', component: CalenderComponent ,canActivate: [AuthGuard]},
{path: 'create/:id', component: EventCreateComponent ,canActivate: [AuthGuard]},
{path: 'details/:name', component: EventDisplayComponent,canActivate: [AuthGuard] },
{path: 'Eventlist', component: EventListComponent,canActivate: [AuthGuard] },
{path: 'stats', component: EventsStatsComponent ,canActivate: [AuthGuard]},
{path: 'scan/:id',component:ScanPressenceComponent,canActivate: [AuthGuard]},

{
  path: 'events',
  component: EventsComponent,canActivate: [AuthGuard]},

    { path: 'events/create/:id', component: EventCreateComponent,canActivate: [AuthGuard] },
    { path: 'events/create', component: EventCreateComponent ,canActivate: [AuthGuard]},
    { path: 'events/Eventlist', component: EventListComponent,canActivate: [AuthGuard] },
    { path: 'events/stats', component: EventsStatsComponent ,canActivate: [AuthGuard]},
    { path: 'events/""', pathMatch: 'full', redirectTo: '/events/create' },
    { path: 'events/**', component: EventCreateComponent ,canActivate: [AuthGuard]},

    { path: 'list', component: ListUsersComponent ,canActivate: [AuthGuard]},
    { path: 'addPack', component: AddPackComponent ,canActivate: [AuthGuard]},
    { path: 'viewPack', component: ViewPackComponent ,canActivate: [AuthGuard]},
    { path: 'viewPack/detail/:id', component: UpdatePackComponent ,canActivate: [AuthGuard]},
    { path: 'HistoriquePacks', component: HistoriquePacksComponent ,canActivate: [AuthGuard]},
     
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  

  exports: [RouterModule]
})

export class AppRoutingModule { }
