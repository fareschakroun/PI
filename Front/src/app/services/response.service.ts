import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient) { }

  saveResponse(response: Response): Observable<Response> {
    return this.http.post<Response>(`http://localhost:8050/api/Responses/`, response);
  }

  getResponseByClaimId(claimId: number): Observable<Response> {
    return this.http.get<Response>(`http://localhost:8050/api/Responses/${claimId}`);
  }

}
