import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'projects/back-office/src/app/models/User';
import { Room } from 'projects/back-office/src/app/models/room';
import { PackServiceService } from 'projects/back-office/src/app/services/pack-service.service';

import { RoomServiceService } from 'projects/back-office/src/app/services/room-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
})
export class RoomsListComponent implements OnInit ,AfterViewInit{
  
  @ViewChild('exampleModalCenter') modal!: ElementRef;
  constructor(
    private sanitizer: DomSanitizer,
    private packService: PackServiceService,
    private userserv: UserService,

    private route: Router,
    private roomService: RoomServiceService
  ) {}
 
  sanitizeHtml(html: string): SafeHtml {
    // Utiliser DomSanitizer pour marquer le HTML comme sûr
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  rooms: Room[] = [];
  test: boolean = false;
  idRoom: number = 0;
  testExistantRoom: boolean = true;
  user: User;
  room!: Room;
  testAvailablePlaces: boolean = true;
  testingPointsNumber: boolean = true;
  ngAfterViewInit(): void {
   
  }
  ngOnInit() :void{
    this.roomService.getAllRooms().subscribe((res) => {
      this.rooms = res;
      console.log(res);
    });
    
    this.userserv
      .getUserById(parseInt(localStorage.getItem('userID')))
      .subscribe((res) => {
        this.user = res;
      });
  

   
  }

  sendcodeRoom(id: string) {
    this.packService.SendCodeRoom(this.user.email.toString(), id).subscribe(
      (r) => {},
      (error) => {
        console.error('Erreur lors de la récupération du room :', error);
      }
    );
  }

 
  Participate(id: number) {
    this.testExistantRoom = true;
    this.testingPointsNumber = true ; 
    this.testAvailablePlaces=true ; 
    this.roomService.getRoomById(id).subscribe(
      (vare) => {
        
        this.userserv
          .getRoomId(parseInt(localStorage.getItem('userID')))
          .subscribe((res) => {
            this.idRoom = res;
            
            if (res === vare.idRoom) {
              this.testExistantRoom = false;
            }
          });
        this.room = vare;

        if(vare.maxParticipants == vare.confirmedParticipant)
        {
          this.testAvailablePlaces=false
        }
        this.test = true;
        if(this.user.points < this.room.price)
        {
          this.testingPointsNumber = false ; 
        }
       
      },
      (error) => {
        console.error('Erreur lors de la récupération du room :', error);
      }
    );
  }
  navigateToPayments(id: number) {
   

    this.route.navigate(['/payments', id]);
    this.modal.nativeElement.dismiss();
  }
  mail() {
   
  }
  userMyPoints(id: number) {
    this.roomService.getRoomById(id).subscribe(
      (vare) => {

        this.packService
        .sendcodeMail(this.user.email.toString(), vare.codeRoom)
        .subscribe(
          () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'envoi code ',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            console.error("Erreur lors de l'ajout", error);
          }
        );
      })
   
    this.userserv.affecterRoomTouser(id,this.user.id, this.user.points).subscribe((r)=>{console.log(r)});
    this.roomService.updateRoomParticipant(id).subscribe(r=>{});
    
   // this.modal.nativeElement.dismiss();
  }

}
