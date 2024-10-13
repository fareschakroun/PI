import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  claimId = '';
  response: Response | null = null;

  ngOnInit() {
   // this.getResponse();
  }

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private responseService: ResponseService
    ) {}

/*  getResponse() {
    if (this.claimId.trim() !== '') {
      this.http.get<Response>('/api/responses/' + this.claimId).subscribe(
        (response) => {
          this.response = response;
        },
        (error) => {
          this.response = null;
        }
      );
    }
  }

  getResponse() {
    const claimId = this.route.snapshot.paramMap.get('claimId');
    this.responseService.getResponseByClaimId(+claimId).subscribe(
      (response: Response) => {
        this.response = response;
      },
      (error) => {
        console.error('Error fetching response:', error);
      }
    );
  }

  saveResponse() {
    const response: Response = {
      claimId: this.response.claimId,
      adminId: this.response.adminId,
      responseText: this.response.responseText,
      createdAt: null, // Let the backend handle this value
      updatedAt: null // Let the backend handle this value
    };

    Swal.fire({
      title: 'Save Response',
      text: 'Are you sure you want to save this response?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.responseService.saveResponse(response).subscribe(
          (savedResponse: Response) => {
            Swal.fire('Success', 'Response saved successfully!', 'success');
            console.log('Response saved:', savedResponse);
          },
          (error) => {
            Swal.fire('Error', 'Failed to save the response', 'error');
            console.error('Error saving response:', error);
          }
        );
      }
    });
  }*/

}
