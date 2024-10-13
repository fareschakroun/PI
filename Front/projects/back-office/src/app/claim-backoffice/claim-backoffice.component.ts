import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from 'src/app/models/claim';
import { ClaimService } from 'src/app/services/claim.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-claim-backoffice',
  templateUrl: './claim-backoffice.component.html',
  styleUrls: ['./claim-backoffice.component.css']
})
export class ClaimBackofficeComponent implements OnInit {
  FilterStatus='pending'
  FilterOrder='Asc'
  filterOrderChange(arg0: string) {
    this.FilterOrder=arg0;
    this.getClaims();
  }
  filterStatusChange // For example, you may want to refresh the list of claims
  (arg0: string) {
    this.FilterStatus=arg0;
    this.getClaims();
  }
  //claims! : Claim[];
  searchText: string = '';
  claims: Claim[] = [];
  filteredClaims: Claim[] = [];
  selectedSearchOption: string = 'subject'; // Default selected option
  searchOptions: any[] = [
    { value: 'subject', viewValue: 'Subject' },
    { value: 'status', viewValue: 'Status' },
    { value: 'levelAsc', viewValue: 'Level Ascending' },
    { value: 'levelDesc', viewValue: 'Level Descending' }
  ];


  constructor(
    private router: Router,
    private service: ClaimService
  ){}

  ngOnInit(): void {
    this.defaultLoad();
   }

   defaultLoad(){
    this.service.getClaimsList().subscribe(
      (response: Claim[]) => {
        this.claims = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
   }
    getClaims() {
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

   goToclaimsList(){
    this.router.navigate(['/claims']);
  }

  deleteClaim(claimId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteClaim(claimId).subscribe(
          () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your claim has been rejected.",
              icon: "success"
            }).then(() => {
              location.reload(); // Reload the page after successful deletion
            });
          },
          (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the claim.",
              icon: "error"
            });
          }
        );
      }
    });
  }

  rejectClaim(claimId: number): void {
    this.deleteClaim(claimId);
  }

  updateClaimDecision(claimId: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this claim. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateClaimDecision(claimId).subscribe(
          () => {
            // Update successful
            Swal.fire({
              title: "Updated!",
              text: "The claim has been updated.",
              icon: "success"
            }).then(() => {
              // Reload the page after successful update
              location.reload();
            });
          },
          (error) => {
            // Check if the error status is 200 and handle it as a success
            if (error.status === 200) {
              Swal.fire({
                title: "Updated!",
                text: "The claim has been updated.",
                icon: "success"
              }).then(() => {
                // Reload the page after successful update
                location.reload();
              });
            } else {
              // Update failed
              console.error("Update claim error:", error); // Log the error for debugging
              // Handle the error here, you can show a message or do nothing to ignore it
            }
          }
        );
      }
    });
  }
   
 /* search(): void {
    if (this.searchText.trim() !== '') {
      this.service.findCBySubject(this.searchText).subscribe(
        claims => this.claims = claims,
        error => console.log(error)
      );
  
      this.service.findCByStatus(this.searchText).subscribe(
        claims => this.claims = claims,
        error => console.log(error)
      );
  
      this.service.findCByStatus2(this.searchText).subscribe(
        claims => this.claims = claims,
        error => console.log(error)
      );
  
      // Add the search for levelAsc
      this.service.findCBylevelAsc().subscribe(
        claims => this.claims = claims,
        error => console.log(error)
      );
  
      // Add the search for levelDesc
      this.service.findCBylevelDesc().subscribe(
        claims => this.claims = claims,
        error => console.log(error)
      );
    } else {
      this.getClaims(); // Reload all claims if search text is empty
    }
  }*/



  search(): void {
    if (this.searchText.trim() !== '') {
      switch (this.selectedSearchOption) {
        case 'subject':
          this.service.findCBySubject(this.searchText).subscribe(
            claims => this.claims = claims,
            error => console.log(error)
          );
          break;
        case 'status':
          this.service.findCByStatus(this.searchText).subscribe(
            claims => this.claims = claims,
            error => console.log(error)
          );
          break;
        case 'levelAsc':
          this.service.findCBylevelAsc().subscribe(
            claims => this.claims = claims,
            error => console.log(error)
          );
          break;
        case 'levelDesc':
          this.service.findCBylevelDesc().subscribe(
            claims => this.claims = claims,
            error => console.log(error)
          );
          break;
        default:
          this.getClaims(); // Reload all claims if no option is selected
          break;
      }
    } else {
      this.getClaims(); // Reload all claims if search text is empty
    }
  }




  }

 /* search() {
    if (this.searchText.trim() !== '') {
      const filterValue = this.searchText.toLowerCase();
      this.filteredClaims = this.claims.filter(claim =>
        claim.subject?.toLowerCase().includes(filterValue) ||
        claim.status?.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredClaims = this.claims; // Reset filteredClaims to all claims
    }
  }*/




