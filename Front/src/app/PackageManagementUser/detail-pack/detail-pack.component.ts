import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pack } from 'projects/back-office/src/app/models/pack';
import { PackServiceService } from 'projects/back-office/src/app/services/pack-service.service';
import { RoomServiceService } from 'projects/back-office/src/app/services/room-service.service';

@Component({
  selector: 'app-detail-pack',
  templateUrl: './detail-pack.component.html',
  styleUrls: ['./detail-pack.component.css']
})
export class DetailPackComponent implements OnInit {
  packs: Pack[] = [];
  id = 0;
  constructor(private activate: ActivatedRoute,private packService: PackServiceService, private route: Router,private roomService: RoomServiceService) {}

  
  ngOnInit() {
    this.id = this.activate.snapshot.params['typePack'];  
    if(this.id==2){
      this.packService.findNonReservedPackPerType('standard',true).subscribe(res => {
        this.packs = res;
      });
    }
    
    if(this.id==0){
      this.packService.findNonReservedPackPerType('diamond',true).subscribe(res => {
        this.packs = res;
      });
    }
    if(this.id==1){
      this.packService.findNonReservedPackPerType('silver',true).subscribe(res => {
        this.packs = res;
      });
    }
  }

}
