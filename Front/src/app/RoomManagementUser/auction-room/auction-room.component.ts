import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { StompService } from '@stomp/ng2-stompjs';
//import { Message } from '@stomp/stompjs';
import moment from 'moment';
import { Enchere } from 'projects/back-office/src/app/models/Enchere';
import { User } from 'projects/back-office/src/app/models/User';

import { Room } from 'projects/back-office/src/app/models/room';
import { PackServiceService } from 'projects/back-office/src/app/services/pack-service.service';
import { gsap } from 'gsap';
import { RoomServiceService } from 'projects/back-office/src/app/services/room-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auction-room',
  templateUrl: './auction-room.component.html',
  styleUrls: ['./auction-room.component.css'],
})
export class AuctionRoomComponent implements OnInit {
  usersInRoom: any[] = [];
  @ViewChild('sellerBox') sellerBoxRef!: ElementRef; // Référence à l'élément du box dans le template HTML
  animateBoxUp() {
    const sellerBox = this.sellerBoxRef.nativeElement as HTMLElement; // Récupère l'élément du box du DOM
    gsap.to(sellerBox, {
      y: -100, // Déplace le box vers le haut de 100px
      duration: 0.5, // Durée de l'animation en secondes
      ease: 'power2.out', // Type d'interpolation pour une transition douce
    });
  }
  constructor(
    private activate: ActivatedRoute,
    private roomService: RoomServiceService,
    private userserv: UserService, private router:Router
  ) {}

  room: Room = new Room();
  id = 0;
  isAuctionEnded: boolean = false;
  isAuctionEndedWinners: boolean = false;
  isAuctionEndedLosers: boolean = false;
  isUserWinner: boolean = false;
  ExpiringPoints: boolean = false;
  oldPoints : number
  playingPoints : number
  timeLeft: string = '';
  calculateTimeLeft(): void {
    const now = moment();
    const endTime = moment(this.room.dateDebut).add(
      this.room.duration,
      'minutes'
    );
    const duration = moment.duration(endTime.diff(now));

    if (duration.asSeconds() < 0) {
      this.timeLeft = ' 00:00:00';
      this.roomService
        .getTopEncheresByRoomId(this.id)
        .subscribe((response) => {
          console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"+response)
          response.forEach((element: Enchere) => {
            const companyIdToCheck = parseInt(localStorage.getItem('userID'));
            const isCompanyIdPresent = response.some((elemente: Enchere) => {
            
              return elemente.idcompany === companyIdToCheck;
            });

            if (isCompanyIdPresent) {
              this.isAuctionEndedWinners = true;
            } else {
              console.log("ols"+this.oldPoints)
              console.log("ccc"+this.room.price)
              console.log(this.playingPoints)
            console.log(this.oldPoints+this.room.price+this.playingPoints );
              this.userserv.RembourssementPoints(parseInt(localStorage.getItem("userID")),(this.playingPoints+this.room.price)).subscribe(()=>{})
          
              this.isAuctionEndedLosers = true;
            }
          });
        });

      this.isAuctionEnded = true;
      const modalElement = document.getElementById('exampleModalCenterr');
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
      }
    } else {
      this.timeLeft = ` ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
    }
  }

  showModal(): void {
    const modalElement = document.getElementById('exampleModalCenterr');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }
  fetchInterval: any;
  currentEnchere: Enchere;
  highestEnchre: number;
  highestPricingUser: any;
  findHighestPricingUser(users: any[]) {
    if (users.length > 0) {
      this.highestPricingUser = users[0]; // Le premier utilisateur sera celui avec le prix le plus élevé après le tri
    } else {
      this.highestPricingUser = null;
    }
  }

  CurentUser: User;
  ngOnInit() {
    this.id = this.activate.snapshot.params['id'];
    this.userserv
    .getUserById(parseInt(localStorage.getItem('userID')))
    .subscribe((res) => {
      this.oldPoints = res.points;
      this.playingPoints = res.points
    });
    this.calculateTimeLeft();

    this.fetchInterval = setInterval(() => {
      
      this.roomService.getRoomById(this.id).subscribe(
        (r) => {
          this.room = r;
        },
        (error) => {
          console.error('Erreur lors de la récupération du room :', error);
        }
      );
      this.userserv
        .getUserById(parseInt(localStorage.getItem('userID')))
        .subscribe((res) => {
          this.CurentUser = res;
        });
      if (this.CurentUser.points == 0) {
        this.ExpiringPoints = true;
      }
      this.roomService
        .getCurrentUserBiding(parseInt(localStorage.getItem('userID')), this.id)
        .subscribe((res) => {
          this.currentEnchere = res;
        });

      this.calculateTimeLeft();
      this.roomService.getUsersEnterningAuction(this.id).subscribe(
        (r) => {
          r.sort((a: any, b: any) => b.pricing - a.pricing);
          this.usersInRoom = r;
        },
        (error) => {
          console.error('Erreur getting users :', error);
        }
      );
    }, 1000);
  }

 /* ngOnDestroy() {
    const userID = parseInt(localStorage.getItem('userID'));

    this.roomService
      .deleteUserSortieEnchere(userID, this.room.idRoom)
      .subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès');
        },
        (error) => {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
        }
      );
    this.fetchInterval();
    clearInterval(this.fetchInterval);
  }*/


  navigateToListeRooms(){
    this.userserv.RemoveUserRoom(parseInt(localStorage.getItem("userID"))).subscribe(()=>{})
    this.roomService.updateRoomStatus(this.id).subscribe(()=>{})
   /*  this.roomService
      .deleteUserSortieEnchere(parseInt(localStorage.getItem("userID")), this.room.idRoom)
      .subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès');
        },
        (error) => {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
        }
      ); */
    this.router.navigate(['/ListPacks/ListRooms']);
  }

  navigateToRoolette(){
   /*  this.roomService
    .deleteUserSortieEnchere(parseInt(localStorage.getItem("userID")), this.room.idRoom)
      .subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès');
        },
        (error) => {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
        }
      ); */
  //  this.userserv.RemoveUserRoom(parseInt(localStorage.getItem("userID"))).subscribe(()=>{})
    this.roomService.updateRoomStatus(this.id).subscribe(()=>{})
    this.router.navigate(['roulette', this.id]);
  }
  updatePrice(tokenAmount: number): void {
   
    if (this.CurentUser.points > 0 && this.CurentUser.points  >= tokenAmount ) {
      this.roomService
        .updatePricingEnchere(
          parseInt(localStorage.getItem('userID')),
          this.room.idRoom,
          tokenAmount
        )
        .subscribe(() => {
          this.userserv
            .UpdateUserPoints(
              parseInt(localStorage.getItem('userID')),
              tokenAmount
            )
            .subscribe((res) => {
              this.CurentUser = res;
            });

          this.roomService
            .findHighestPricedEnchereByRoomId(this.id)
            .subscribe((res) => {
              this.roomService
                .UpdatePriceAuction(res.pricing, this.id)
                .subscribe((priceUpdate: any) => {
                  this.room.priceAuction = priceUpdate;
                });
            });
        });
    } else {
      Swal.fire({
        title: 'Operation failure!',
        text: 'You expired all your points !',
        icon: 'error',
        showConfirmButton: false,
      });
    }
  }
}
