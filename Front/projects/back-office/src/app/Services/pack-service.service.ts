import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackServiceService {


  
  url = "http://localhost:8222/api/packs/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })
  };
  constructor(private http: HttpClient ) { }
/********************* stat  */
public getPackStatisticsByYearAndStatus (  ): Observable<any>
{
  return this.http.get<any>( this.url + "getPackStatisticsByYearAndStatus" );
}

public getPayments (  ): Observable<any>
{
  return this.http.get<any>( this.url + "getPayments" );
}


public getPacksByStatus ( status: boolean ): Observable<any>
{
  return this.http.get<any>( `${ this.url }getPacksByStatus/${ status }`, {
    
  } );

}

/********************* stat  */

  public getDetailsPackById ( id: number ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }retrievePackage/${ id }`, {
      
    } );
 
  }
  UpdatePack ( data: any ): Observable<any> 
  {
   
    return this.http.put<any>( this.url + 'updatePackage', data ,this.httpOptions);
  
  }
  addPack ( data: any )
  {
    return this.http.post<any>( this.url + "addPackge", data );
  }
  public getAllPacks (  ): Observable<any>
  {
    return this.http.get<any>( this.url + "getAllPacks" );
  }

  
  public findPacksByIdRoom ( id: number ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }findPacksByIdRoom/${ id }`, {
      
    } );
 
  }

  public findByTypePack ( typePack: string ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }getpackBYType/${ typePack }`, {
      
    } );
 
  }

  deletePack ( id: number ): Observable<any>
  {
   
    return this.http.delete(`${ this.url }deletePack/${ id }` , {
      
    } );
 
  }
  public RevenuePeTypePack ( typePack: string ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }RevenuePeTypePack/${ typePack }`, {
      
    } );
 
  }


  public calculateReservationPercentageByType (  ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }calculateReservationPercentageByType`, {
   
    } );
 
  }
  public toployalcustomers (  ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }toployalcustomers`, {
 
    } );
 
  }


  public SendCodeRoom(email: string, code: string): Observable<any> {
    return this.http.put<any>(`${this.url}SendCodeRoom/${email}/${code}`, {});
  }


  public QuantitePeTypePack ( typePack: string ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }QuantitePeTypePack/${ typePack }`, {
      
    } );
 
  }

  public revenueTotal (): Observable<any>
  {
    return this.http.get<any>( `${ this.url }revenueTotal`, {
      
    } );
 
  }
  sendcodeMail (email: string, code: string )
  {
    return this.http.post<any>( `${ this.url }sendMail/${email}/${code}`, {
      
    } );
  }


  public findMinPriceByTypePack ( typePack: string ): Observable<any>
  {
    return this.http.get<any>( `${ this.url }findMinPriceByTypePack/${ typePack }`, {
      
    } );
 
  }

  public findNonReservedPackPerType ( typePack: string , status:boolean): Observable<any>
  {
    return this.http.get<any>( `${ this.url }findNonReservedPackPerType/${ typePack }/${ status }`, {
      
    } );
 
  }
  
}
