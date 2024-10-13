import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  public getClaimsListAsc(status:string): Observable<Claim[]> {
    return this.http.get<Claim[]>('http://localhost:8222/api/Claims/levelAsc/'+status);
  }
  public getClaimsList(): Observable<Claim[]> {
    return this.http.get<Claim[]>('http://localhost:8222/api/Claims');
  }
  public getClaimsListDesc(status:string): Observable<Claim[]> {
    return this.http.get<Claim[]>('http://localhost:8222/api/Claims/levelDesc/'+status);
  }

  public addClaim(claim: Claim): Observable<Object> {
    return this.http.post<Claim>(`http://localhost:8222/api/Claims`, claim);
  }

  public deleteClaim(idClaim: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8222/api/Claims/remove-claim/${idClaim}`);
  }

  public updateClaim(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`http://localhost:8222/api/Claims`, claim);
  }

  public getClaim(idClaim: number): Observable<Claim> {
    return this.http.get<Claim>(`http://localhost:8222/api/Claims/retrieve-claim/${idClaim}`);
  }

  public findCBySubject(subject: string): Observable<Claim[]> {
    return this.http.get<Claim[]>(`http://localhost:8222/api/Claims/find/${subject}`);
  }

  public findCByStatus(status: string): Observable<Claim[]> {
    return this.http.get<Claim[]>(`http://localhost:8222/api/Claims/find2/${status}`);
  }

  public findCByStatus2(status: string): Observable<Claim[]> {
    return this.http.get<Claim[]>(`http://localhost:8222/api/Claims/find3/${status}`);
  }

  public findCBylevelAsc(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`http://localhost:8222/api/Claims/levelAsc`);
  }

  public findCBylevelDesc(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`http://localhost:8222/api/Claims/levelDesc`);
  }

  public updateClaimDecision(claimId: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8222/api/Claims/decision/${claimId}`, {});
  }

  
}
