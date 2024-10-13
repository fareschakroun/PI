import { Component, OnInit } from '@angular/core';

import { Room } from '../../models/room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomServiceService } from '../../services/room-service.service';

import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pack } from '../../models/pack';
import { PackServiceService } from '../../services/pack-service.service';
import { User } from '../../models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.css']
})
export class DetailRoomComponent  implements OnInit {
  room!: Room;
  pack!: Pack[];
  users:User[]=[]; 
  id = 0;
  constructor(private userService:UserService, private sanitizer: DomSanitizer, private activate: ActivatedRoute,private packService: PackServiceService, private route: Router,private roomService: RoomServiceService) {}
  extractedText: string = '';
  extractText() {
  
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this.room.description;
    this.extractedText = tempElement.textContent || tempElement.innerText || '';
  }
  sanitizeHtml(html: string): SafeHtml {
    // Utiliser DomSanitizer pour marquer le HTML comme sûr
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit() {
  
    this.id = this.activate.snapshot.params['id'];  
    this.userService.getUsersByIdRoom(this.id).subscribe((res)=>{
      this.users= res
    })
    this.packService.findPacksByIdRoom(this.id).subscribe(
      (r) => {
        this.pack = r;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération du room :",
          error
        );
      }
    );

    this.roomService.getRoomById(this.id).subscribe(
      (r) => {
       
        this.room = r;
        this.extractText();
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération du room :",
          error
        );
      }
    );

   
  }
  editorConfig = {
    // CKEditor configuration options
    // Example: You can add a custom toolbar here
    toolbar: [
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'] },
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
      { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
      { name: 'tools', items: ['Maximize'] }
    ]
  };

  updateRoom():void { 
    this.room.idRoom= this.id ; 
    this.room.packages = this.pack;
  
    this.roomService.UpdateRoom(this.room).subscribe(
   
      () => {
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "room updated Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
       
      },
      (error) => {
        console.error("Erreur lors de l'ajout", error);
      }
    );}
}
