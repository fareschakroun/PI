import { Component } from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PackServiceService } from '../../services/pack-service.service';
import { Pack } from '../../models/pack';


@Component({
  selector: 'app-add-pack',
  templateUrl: './add-pack.component.html',
  styleUrls: ['./add-pack.component.css']
})
export class AddPackComponent {
  constructor(private packService: PackServiceService , private route:Router ) {}

  pack: Pack = new Pack();
  validateForm(): boolean {
    if (!this.pack.typePack ||!this.pack.price ||!this.pack.description    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all the inputs!'
      });
      return false;
    }
   
    if (!this.pack.price || isNaN(this.pack.price) || this.pack.price < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Price must be a non-negative number!'
      });
      return false;
    }
  
   
      
  
  
    return true;
  }
  addPack(): void {
    if (!this.validateForm()) {
      return;
    }
  
    

  
    this.packService.addPack(this.pack).subscribe(
      () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pack Created Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(["/viewPack"]);
      },
      (error) => {
        console.error("Erreur lors de l'ajout", error);
      }
    );
  }
}



