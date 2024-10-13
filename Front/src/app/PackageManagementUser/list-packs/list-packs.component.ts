import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pack } from 'projects/back-office/src/app/models/pack';
import { PackServiceService } from 'projects/back-office/src/app/services/pack-service.service';
import { RoomServiceService } from 'projects/back-office/src/app/services/room-service.service';

@Component({
  selector: 'app-list-packs',
  templateUrl: './list-packs.component.html',
  styleUrls: ['./list-packs.component.css']
})
export class ListPacksComponent implements OnInit {
  packsDiamond: Pack[] = [];
  packsStandard: Pack[] = [];
  packsSilver: Pack[] = [];
  constructor(private packService: PackServiceService, private route: Router,private roomService: RoomServiceService) {}
minSilverPrice : number ; 
minStandardPrice : number ; 
minDiamondPrice : number ; 
  
  ngOnInit() {

    this.packService.findMinPriceByTypePack('diamond').subscribe(res => {
      this.minDiamondPrice = res;
    });

    this.packService.findMinPriceByTypePack('standard').subscribe(res => {
      this.minStandardPrice = res;
    });
    this.packService.findMinPriceByTypePack('silver').subscribe(res => {
      this.minSilverPrice = res;
    });
    this.packService.findByTypePack('diamond').subscribe(res => {
      this.packsDiamond = res;
    });

    this.packService.findByTypePack('standard').subscribe(res => {
      this.packsStandard = res;
    });

    this.packService.findByTypePack('silver').subscribe(res => {
      this.packsSilver = res;
    });
  }

}
