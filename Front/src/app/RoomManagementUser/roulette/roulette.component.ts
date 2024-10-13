import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  Input,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {
  Item,
  NgxWheelComponent,
  TextAlignment,
  TextOrientation,
} from 'ngx-wheel';
import { Pack } from 'projects/back-office/src/app/models/pack';
import { Room } from 'projects/back-office/src/app/models/room';
import { PackServiceService } from 'projects/back-office/src/app/services/pack-service.service';
import { RoomServiceService } from 'projects/back-office/src/app/services/room-service.service';
import { WebSocketService } from 'src/app/services/websocketservice';
import { setInterval } from 'stompjs';

import Swal from 'sweetalert2';
// Déclarez jQuery comme variable externe

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css'],
})
export class RouletteComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel!: NgxWheelComponent;
  constructor(
    private activate: ActivatedRoute,
    private packService: PackServiceService,
    private route: Router,
    private roomService: RoomServiceService,
    private ngZone: NgZone,
    private webSocketService: WebSocketService // private socket: Socket
  ) {}

  rouletteResult: number | undefined;
  idToLandOn: any;
  resultWinner: number[] = [];
  items: Item[] = [];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  room: Room = new Room();
  pack!: any[];
  id = 1;
  packNames: Pack[] = [];
  seed: any[] = [];
  isSpinning: boolean = false;
  spinNumber = 0;
  role: any;
  testButtonAdmin : boolean=false;
  testSocket() {
    console.log('RESULTS FROM BACK');
    // console.log(this.webSocketService.getResults(this.id));
  }
  number = 0;
  varInterval: any;
  valuee:any ; 
  ngOnInit() :void  {
   
    this.getPack();

   


   

    this.webSocketService.connectToStartRouletteSocket();

    this.webSocketService
      .getStartRouletteSubject()
      .subscribe(async(messageObject) => {
        console.log('MESSAGE OBJECT');
        console.log(messageObject);
        this.idToLandOn = messageObject;
  
        // Check if this.idToLandOn is properly set
        if (this.idToLandOn) {
          try {
            // Call this.wheel.spin() after a short delay to ensure idToLandOn is set
            await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the delay as needed
            await this.wheel.spin();
          } catch (error) {
            console.error('Error occurred while calling this.wheel.spin():', error);
          }
        } else {
          console.error('idToLandOn is not properly set.');
        }
      });

    console.log(this.id);

    
  }

  getPack() {
    console.log('eeeeeeeeeeeeeee');
    this.id = this.activate.snapshot.params['id'];
    this.roomService.getRoomPackages(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.packNames = data;
        this.seed = this.packNames.map((pack) => pack.idPack);

         /* this.idToLandOn =
        this.seed[Math.floor(Math.random() * this.seed.length)];
         */
        console.log('ID TO LAND ON');
        console.log(this.idToLandOn);

        const colors = ['#B31312', '#141A3D', '#545D91', '#00353F'];

        this.items = this.seed.map((value) => ({
          fillStyle: colors[value % 3],
          text: `Pack ${value}`,
          id: value,
          textFillStyle: 'white',
          textFontSize: '16',
        }));
        this.wheel.items = this.items;
        this.wheel.reset();
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des noms de pack :',
          error
        );
      }
    );
  }

  reset() {
    this.wheel.reset();
    // this.idToLandOn =
    //this.seed[Math.floor(Math.random() * this.seed.length)];
  }
  before() {
    this.webSocketService.GetRandomIndex().subscribe((res) => {
      console.log(res.randomValue, 'khraa');
      this.valuee = res.randomValue;
    });
    // alert('Your wheel is about to spin');
    console.log("before")
   
  }
  stoppedAt: number = -1;

  async spin(idTolandOn: any) {
    this.idToLandOn =idTolandOn ;
  
   
    this.reset();

    this.webSocketService.startRoulette();


   
   
  }

  after() {
  
    console.log('spin number is : ' + this.spinNumber);
    console.log(
      "La roulette s'est arrêtée sur la position:",
      this.wheel.idToLandOn
    );
    console.log('on spinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    console.log(this.wheel.idToLandOn);
   
    // Vous pouvez également utiliser la position pour accéder à l'élément correspondant
    const landedItem = this.items.find((item) => item.id === this.stoppedAt);
    if (landedItem) {
      console.log(
        "L'élément sur lequel la roulette s'est arrêtée est:",
        landedItem
      );
    }

    
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'campany x with id win pack ' + this.idToLandOn,
      showConfirmButton: false,
      timer: 2500,
      
    } ).then((result)=>{
      if(this.role !=="admin")
      {this.roomService
      .ReservePack(this.wheel.idToLandOn, this.id)
      .subscribe(() => {

          location.reload();
      });
     ;}
     this.getPack()
    });
  }
}
