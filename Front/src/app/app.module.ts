import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DetailsComponent } from './quizdetails/details/details.component';
import { QuizinterfaceComponent } from './quizdetails/quizinterface/quizinterface.component';
import { GeneralquizinterfaceComponent } from './quizdetails/generalquizinterface/generalquizinterface.component';
import { AddQuizComponent } from './quizdetails/add-quiz/add-quiz.component';
import { TodoComponent } from './todo/todo.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { QuizDetailsComponent } from './quizdetails/quiz-details.component';
import { QuizResultDisplayComponent } from './quizdetails/quiz-result-display/quiz-result-display.component';
//import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { PostListComponent } from './ForumManagement/post-list/post-list.component';
import { PostDetailComponent } from './ForumManagement/post-detail/post-detail.component';
import { ClaimFormComponent } from './ClaimManagement/claim-form/claim-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostFormComponent } from './ForumManagement/post-form/post-form.component';
import Swal from 'sweetalert2';
import { ClaimListComponent } from './ClaimManagement/claim-list/claim-list.component';


import { CalenderComponent } from './quizdetails/calender/calender.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { EventsComponent } from './events/events.component';
import { AfficherOffreComponent } from './offer/afficher-offre/afficher-offre.component';
import { AjouterOffreComponent } from './offer/ajouter-offre/ajouter-offre.component';
import { DetailOffreComponent } from './offer/detail-offre/detail-offre.component';
import { ModifierOfferComponent } from './offer/modifier-offer/modifier-offer.component';
import { AfficherCandidatureComponent } from './candidature/afficher-candidature/afficher-candidature.component';
import { DetailCandidatureComponent } from './candidature/detail-candidature/detail-candidature.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AfficherCandidatursUserComponent } from './candidature/afficher-candidaturs-user/afficher-candidaturs-user.component';
import { DatePipe } from '@angular/common';
import { CKEditorModule } from 'ckeditor4-angular';

//import { ZXingScannerModule } from '@zxing/ngx-scanner';
//import { QRCodeModule } from 'angularx-qrcode';
//import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListPacksComponent } from './PackageManagementUser/list-packs/list-packs.component';
import { DetailPackComponent } from './PackageManagementUser/detail-pack/detail-pack.component';
import { MyPacksComponent } from './PackageManagementUser/my-packs/my-packs.component';
import { RoomsListComponent } from './RoomManagementUser/rooms-list/rooms-list.component';
import { AuctionRoomComponent } from './RoomManagementUser/auction-room/auction-room.component';
import { MyRoomsComponent } from './RoomManagementUser/my-rooms/my-rooms.component';
import { PaymentComponent } from './payment/payment.component';
//import { StripeModule } from 'stripe-angular';
import { RouletteComponent } from './RoomManagementUser/roulette/roulette.component';
import { NgxWheelModule } from 'ngx-wheel'; //<-- import here
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { MessagestestComponent } from './messagestest/messagestest.component';
import { NewsupplierfrontComponent } from './newsupplierfront/newsupplierfront.component';
import { ExhibitorReservationComponent } from './exhibitor-reservation/exhibitor-reservation.component';
import { DragDropModule, CdkDrag } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationinterfaceComponent } from './authenticationinterface/authenticationinterface.component';
import { TokenInterceptorInterceptor } from 'projects/back-office/src/app/token-interceptor.interceptor';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatSupplierAdminComponent } from './chat-supplier-admin/chat-supplier-admin.component';
import { BoothsForSupplierComponent } from './booths-for-supplier/booths-for-supplier.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { QuizResultListComponent } from './quizdetails/quiz-result-list/quiz-result-list.component';
import { RouterModule } from '@angular/router';
//import { CommentComponent } from './events/comment/comment.component';
import { CarouselModule } from '@coreui/angular';
@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    PostFormComponent,
    ClaimFormComponent,
    ClaimListComponent,
    AppComponent,
    //ProfileComponent,
    CalenderComponent,
    DetailsComponent,
    QuizinterfaceComponent,
    GeneralquizinterfaceComponent,
    AddQuizComponent,
    TodoComponent,
    QuizDetailsComponent,
    QuizResultDisplayComponent,
    EventsComponent,
    AfficherOffreComponent,
    AjouterOffreComponent,
    DetailOffreComponent,
    ModifierOfferComponent,
    AfficherCandidatureComponent,
    DetailCandidatureComponent,
    AfficherCandidatursUserComponent,
    HeaderComponent,
         FooterComponent,
         MessagestestComponent,
         NewsupplierfrontComponent,
         ExhibitorReservationComponent,
         SupplierDetailComponent,
         DialogboxComponent,
         AuthenticationinterfaceComponent,
    ListPacksComponent,
    DetailPackComponent,
    MyPacksComponent,
    RoomsListComponent,
    AuctionRoomComponent,
    MyRoomsComponent,
    PaymentComponent,
    RouletteComponent,
    SignUpComponent,
    ChatSupplierAdminComponent,
    BoothsForSupplierComponent,
    QuizResultListComponent,
    //CommentComponent,
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    NgxWheelModule  ,
    BrowserModule,
    AppRoutingModule,
    ScheduleModule, RecurrenceEditorModule,
    HttpClientModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ButtonsModule,
    BrowserAnimationsModule ,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    //NgxWheelModule  ,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  MatInputModule,
    FormsModule,
     RecurrenceEditorModule,
      BrowserAnimationsModule,
      HttpClientModule,
      NgbModule,
     CarouselModule,
    //FormGroup,
    HttpClientModule,

    
    NgbModule,
    //QRCodeModule,
    //ZXingScannerModule,
    //ZXingScannerModule 
    DragDropModule,
   MatTooltipModule,
   MatNativeDateModule,
   MatDialogModule,
    //StripeModule.forRoot("pk_test_51OpCPlJKKu0bIqcHkJm13XGfPK7iBH0BHkBLr2K7AZG0tlw4RFMeXtVdFMbrgTXF1Pdu6r6hCOFlzmT2I3YlZOTV00FBNKzXAC"),

  ],

  //providers: [DatePipe],

  providers: [ 
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
    
  ],
  ///[DatePipe],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class AppModule { }
