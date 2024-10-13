import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { RoomServiceService } from '../../services/room-service.service';
import { Pack } from '../../models/pack';
import { PackServiceService } from '../../services/pack-service.service';


@Component({
  selector: 'app-historique-packs',
  templateUrl: './historique-packs.component.html',
  styleUrls: ['./historique-packs.component.css']
})
export class HistoriquePacksComponent implements OnInit {
  packs: Pack[] = [];

  constructor(private packService: PackServiceService, private route: Router,private roomService: RoomServiceService) {}

  ngOnInit() {
    this.packService.findByTypePack('diamond').subscribe(res => {
      this.packs = res;
    });
  }
  getpackByType(type:string): void {

    this.packService.findByTypePack(type).subscribe(res => {
      this.packs = res;
    });
  }

}
