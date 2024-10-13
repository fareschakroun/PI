import { Component, OnInit } from '@angular/core';
import { Pack } from '../../models/pack';
import { PackServiceService } from '../../services/pack-service.service';
import { Router } from '@angular/router';
import { RoomServiceService } from '../../services/room-service.service';
import { Room } from '../../models/room';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-pack',
  templateUrl: './view-pack.component.html',
  styleUrls: ['./view-pack.component.css'],
})
export class ViewPackComponent implements OnInit {
  packs: Pack[] = [];

  constructor(
    private packService: PackServiceService,
    private route: Router,
    private roomService: RoomServiceService
  ) {}
  editorConfig = {
    toolbar: [
      {
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'],
      },
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      {
        name: 'insert',
        items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'],
      },
      {
        name: 'paragraph',
        items: [
          'NumberedList',
          'BulletedList',
          '-',
          'Outdent',
          'Indent',
          '-',
          'Blockquote',
        ],
      },
      { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
      { name: 'tools', items: ['Maximize'] },
    ],
  };
  packsAuction: Pack[] = [];
  packsBooth: Pack[] = [];
  ngOnInit() {
    this.packService.getPacksByStatus(true).subscribe((res) => {
      this.packsAuction = res;
    });

    this.packService.getPacksByStatus(false).subscribe((res) => {
      this.packsBooth = res;
    });
  }
  deletePack(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.packService.deletePack(userId).subscribe(() => {
          Swal.fire('Deleted!', 'Your pack has been deleted.', 'success');
          this.packService.getPacksByStatus(true).subscribe((res) => {
            this.packsAuction = res;
          });

          this.packService.getPacksByStatus(false).subscribe((res) => {
            this.packsBooth = res;
          });
        });
      }
    });
  }
  room: Room = new Room();
  getCurrentDateTime(): string {
    return new Date().toISOString().split('.')[0];
  }
  validateForm(): boolean {
    if (
      !this.room.duration ||
      !this.room.price ||
      !this.room.maxParticipants ||
      !this.room.dateDebut 
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all the inputs!',
      });
      return false;
    }
    if (!this.room.dateDebut || new Date(this.room.dateDebut) < new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start date must be greater than or equal to current date!',
      });
      return false;
    }

    if (!this.room.price || isNaN(this.room.price) || this.room.price < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Price must be a non-negative number!',
      });
      return false;
    }
    if (
      !this.room.duration ||
      isNaN(this.room.duration) ||
      this.room.duration < 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'duration must be a non-negative number!',
      });
      return false;
    }
    if (
      !this.room.maxParticipants ||
      isNaN(this.room.maxParticipants) ||
      this.room.maxParticipants < 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'max Participants must be a non-negative number!',
      });
      return false;
    }

    // Ajoutez d'autres validations si nécessaire

    return true;
  }
  addRooms(): void {
    if (!this.validateForm()) {
      return;
    }

    this.roomService.addRoom(this.room).subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'room Created Successfully ',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/viewPack']);
      },
      (error) => {
        console.error("Erreur lors de l'ajout", error);
      }
    );
  }
  getPackStyle(packType: string) {
    // Fonction pour déterminer la classe CSS en fonction du type de pack
    switch (packType) {
      case 'diamond':
        return 'diamond';
      case 'silver':
        return 'silver';
      case 'standard':
        return 'standard';
      default:
        return '';
    }
  }
}
