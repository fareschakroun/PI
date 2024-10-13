import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room';
import { PackServiceService } from '../../services/pack-service.service';
import { Router } from '@angular/router';
import { RoomServiceService } from '../../services/room-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit{
  rooms: Room[] = [];

  constructor(private sanitizer: DomSanitizer,private packService: PackServiceService, private route: Router,private roomService: RoomServiceService) {}
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit() {
    this.roomService.getAllRooms().subscribe(res => {
      console.log(res)
      this.rooms = res;
    });
  }
}
