import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from 'src/app/models/claim';
import { ClaimService } from 'src/app/services/claim.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent {
  filterOrderChange(arg0: string) {
  this.FilterOrder=arg0;
  this.getClaims();
}
filterStatusChange // For example, you may want to refresh the list of claims
(arg0: string) {
  this.FilterStatus=arg0;
  this.getClaims();
}

  claims: Claim[] = [];
  claimToUpdate!: Claim;
  FilterStatus='pending'
  FilterOrder='Asc'
  constructor(
    private service: ClaimService,
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.getClaims();
  }

  private getClaims() {
    if (this.FilterOrder=="Asc")
      {

        this.service.getClaimsListAsc(this.FilterStatus).subscribe(
          (response: Claim[]) => {
            this.claims = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }else{
        this.service.getClaimsListDesc(this.FilterStatus).subscribe(
          (response: Claim[]) => {
            this.claims = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
  }

  deleteClaim(idClaim: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this claim!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteClaim(idClaim).subscribe(
          () => {
            // Reload claims after deletion
            this.getClaims();
            Swal.fire(
              'Deleted!',
              'Your claim has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting claim:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the claim.',
              'error'
            );
          }
        );
      }
    });
  }

  editClaim(claim: Claim) {
    // Copy the claim object to claimToUpdate
    this.claimToUpdate = claim;
    
    // Open a SweetAlert dialog with input fields pre-filled with existing information
    Swal.fire({
      title: 'Edit Claim',
      html:
        `<input id="subject" class="swal2-input" value="${this.claimToUpdate.subject}" placeholder="Subject">
         <textarea id="description" class="swal2-textarea" placeholder="Description">${this.claimToUpdate.description}</textarea>`,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        // Update the claimToUpdate object with edited information from the SweetAlert input fields
        this.claimToUpdate.subject = (<HTMLInputElement>document.getElementById('subject')).value;
        this.claimToUpdate.description = (<HTMLTextAreaElement>document.getElementById('description')).value;
        
        // Call the updateClaim method with the updated claim
        this.service.updateClaim(this.claimToUpdate).subscribe((resp: Claim) => {
          // Show success message using Swal
          Swal.fire({
            icon: 'success',
            title: 'Claim Updated Successfully!',
            text: 'Your changes have been saved.',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally, you can perform additional actions after the user clicks "OK"
            // For example, you may want to refresh the list of claims
            this.getClaims();
          });
        },
        (err) => {
          // Show error message using Swal
          Swal.fire({
            icon: 'error',
            title: 'Error Updating Claim',
            text: 'An error occurred while updating the claim. Please try again later.',
            confirmButtonText: 'OK'
          });
          console.error('Error updating claim:', err);
        }
      );
      }
    });
  }
}
