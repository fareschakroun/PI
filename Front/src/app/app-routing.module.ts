import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalenderComponent } from './quizdetails/calender/calender.component';
import { DetailsComponent } from './quizdetails/details/details.component';
import { QuizinterfaceComponent } from './quizdetails/quizinterface/quizinterface.component';
import { GeneralquizinterfaceComponent } from './quizdetails/generalquizinterface/generalquizinterface.component';
import { TodoComponent } from './todo/todo.component';
import { AddQuizComponent } from './quizdetails/add-quiz/add-quiz.component';
import { QuizDetailsComponent } from './quizdetails/quiz-details.component';

import { ListUsersComponent } from 'projects/back-office/src/app/list-users/list-users.component';
import { PostListComponent } from './ForumManagement/post-list/post-list.component';
import { PostDetailComponent } from './ForumManagement/post-detail/post-detail.component';
import { ClaimFormComponent } from './ClaimManagement/claim-form/claim-form.component';
import { PostFormComponent } from './ForumManagement/post-form/post-form.component';
import { ClaimListComponent } from './ClaimManagement/claim-list/claim-list.component';

import { DisplayComponent } from './events/display/display.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { InitialListEventComponent } from './events/initial-list-event/initial-list-event.component';
import { AfficherOffreComponent } from './offer/afficher-offre/afficher-offre.component';
import { AjouterOffreComponent } from './offer/ajouter-offre/ajouter-offre.component';
import { DetailOffreComponent } from './offer/detail-offre/detail-offre.component';
import { ModifierOfferComponent } from './offer/modifier-offer/modifier-offer.component';
import { AfficherCandidatureComponent } from './candidature/afficher-candidature/afficher-candidature.component';
import { AfficherCandidatursUserComponent } from './candidature/afficher-candidaturs-user/afficher-candidaturs-user.component';
import { AuthGuard } from './auth.guard';
import { ListPacksComponent } from './PackageManagementUser/list-packs/list-packs.component';
import { DetailPackComponent } from './PackageManagementUser/detail-pack/detail-pack.component';
import { MyPacksComponent } from './PackageManagementUser/my-packs/my-packs.component';
import { RoomsListComponent } from './RoomManagementUser/rooms-list/rooms-list.component';
import { AuctionRoomComponent } from './RoomManagementUser/auction-room/auction-room.component';
import { MyRoomsComponent } from './RoomManagementUser/my-rooms/my-rooms.component';
import { PaymentComponent } from './payment/payment.component';
import { RouletteComponent } from './RoomManagementUser/roulette/roulette.component';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from '../../projects/back-office/src/app/supplier/supplier.component';
import { NewsupplierfrontComponent } from './newsupplierfront/newsupplierfront.component';
import { ExhibitorReservationComponent } from './exhibitor-reservation/exhibitor-reservation.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { MessagestestComponent } from './messagestest/messagestest.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationinterfaceComponent } from './authenticationinterface/authenticationinterface.component';
import { ChatSupplierAdminComponent } from './chat-supplier-admin/chat-supplier-admin.component';
import { BoothsForSupplierComponent } from './booths-for-supplier/booths-for-supplier.component';
import { QuizResultListComponent } from './quizdetails/quiz-result-list/quiz-result-list.component';
export * from '../../projects/back-office/src/app/app.module'; // <==== THAT WAS MISSING
export * from '../../projects/back-office/src/app/supplier/supplier.component';
const routes: Routes = [  
  {path:'' ,redirectTo:'index',pathMatch:'full'},
  { path: 'backoffice', loadChildren: () => import('../../projects/back-office/src/app/app.module').then(m => m.AppModule) },
  { path: 'display/:name', component: DisplayComponent },
  { path: 'index', component: InitialListEventComponent  },
  { path: 'list', component: EventsListComponent },
  { path: 'events',
   loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },

 

  { path: 'signup', component: SignUpComponent },
  { path: 'auth', component: AuthenticationinterfaceComponent },
  { path: 'offers', component:AfficherOffreComponent , canActivate: [AuthGuard]},
  { path: 'addoffer', component:AjouterOffreComponent , canActivate: [AuthGuard]},
  { path: 'offers/:id', component:DetailOffreComponent , canActivate: [AuthGuard]},
  { path: 'modifier/:id', component:ModifierOfferComponent , canActivate: [AuthGuard]},
  { path: 'offer/applications/:id', component:AfficherCandidatureComponent, canActivate: [AuthGuard]}, //exhibitor accep/refuse candidature
  { path: 'myapplications', component:AfficherCandidatursUserComponent, canActivate: [AuthGuard]},

  { path: 'message', component: MessagestestComponent, canActivate: [AuthGuard] },
  { path: 'supplier/front', component: NewsupplierfrontComponent , canActivate: [AuthGuard]},
 
  
  { path: 'exhibitor/front', component: ExhibitorReservationComponent,  canActivate: [AuthGuard] },
  { path: 'supplierBooth/front', component: BoothsForSupplierComponent,  canActivate: [AuthGuard] },
  { path: 'chat', component: ChatSupplierAdminComponent , canActivate: [AuthGuard]},
  //{ path: 'backoffice', loadChildren: () => import('../../projects/back-office/src/app/app-routing.module').then(m => m.AppRoutingModule) }

  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'post-detail/:id', component: PostDetailComponent, canActivate: [AuthGuard]},
  { path: 'post-form', component: PostFormComponent, canActivate: [AuthGuard]},
  { path: 'claim-form', component: ClaimFormComponent, canActivate: [AuthGuard]},
  { path: 'claim-list', component: ClaimListComponent, canActivate: [AuthGuard]},

  { path: 'ListPacks', component: ListPacksComponent , canActivate: [AuthGuard]},
  { path: 'ListPacks/DetailPack/:typePack', component: DetailPackComponent , canActivate: [AuthGuard]},
  { path: 'MyPacks', component: MyPacksComponent , canActivate: [AuthGuard]},
  { path: 'ListPacks/ListRooms', component: RoomsListComponent ,canActivate:[AuthGuard]},
  { path: 'auction/:id/:points', component: AuctionRoomComponent ,canActivate:[AuthGuard]},
  { path: 'roulette/:id', component: RouletteComponent,canActivate:[AuthGuard] },
  { path: 'myRooms/:idRoom/:idCompany', component: MyRoomsComponent , canActivate: [AuthGuard]},
  { path: 'payments/:id', component: PaymentComponent , canActivate: [AuthGuard]},
  { path: 'calender', component: CalenderComponent ,canActivate: [AuthGuard]},
  { path: 'Details', component: DetailsComponent ,canActivate: [AuthGuard]},
  { path: 'quiztest', component: QuizinterfaceComponent ,canActivate: [AuthGuard]},
  { path: 'historique', component: QuizResultListComponent ,canActivate: [AuthGuard]},
  
  { path: 'quizgeneral/:id', component: GeneralquizinterfaceComponent ,canActivate: [AuthGuard]},
  { path: 'todo', component: TodoComponent ,canActivate: [AuthGuard]},
  { path: 'addquiz', component:AddQuizComponent ,canActivate: [AuthGuard]},
  { path: 'quizdetail/:id', component:QuizDetailsComponent},
  { path: 'backoffice', loadChildren: () => import('../../projects/back-office/src/app/app.module').then(m => m.AppModule) }
  
  
  
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
   
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }


