import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../models/candidature';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  
  offerUrl ='http://localhost:8222/api/Application';

  constructor(private http:HttpClient) { }

  getAllApplications():Observable<Candidature[]>{
    return this.http.get<Candidature[]>(this.offerUrl+'/allApplications')
  }
  getAllApplicationsByOffer(id : number):Observable<Candidature[]>{ 
    return this.http.get<Candidature[]>(this.offerUrl+'/allApplicationsByOffer/'+id)
  }
  getAllApplicationsByUser(id : number):Observable<Candidature[]>{ 
    return this.http.get<Candidature[]>(this.offerUrl+'/allApplicationsByUser/'+id)
  }
  addApplication(formData:FormData): Observable<any> { 
    return this.http.post<any>(this.offerUrl+'/add',formData)
  }
  deleteOffer(id : number):Observable<Candidature>{ ///  api/Application/{idApplication}
    return this.http.delete<Candidature>(this.offerUrl+'/'+id)
  }

  /*updateOffer(formData:FormData):Observable<Offer[]> 
  {
    return this.http.put<Offer[]>(this.offerUrl+'/update',formData)
  }*/

  getApplicationById(id:number):Observable<Candidature> 
  {
    return this.http.get<Candidature>(this.offerUrl+'/application/'+id);
  }
  changeStatus(formData:FormData):Observable<Candidature>
  {
    return this.http.put<Candidature>(this.offerUrl+"/application/status",formData)
  } ///api/Application/nbrCandidature
  nbrApplicationOnOffer():Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/nbrCandidature")
  }
  ///api/Application/nbrStatusApplication
  getNbrStatusApplication():Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/nbrStatusApplication")
  }
  getNbrApplicationsByMonth(year : string):Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/nbrApplicationsByMonth/"+year)
  }
  getCountApplicationsByOfferExhibitor(exhibitorId:string):Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/getCountApplicationsByOfferExhibitor/"+exhibitorId)
  }
  ///api/Application/getCountStagesAndOffersByOfferExhibitor/{exhibitorId}/{typeOffer}
  getCountStagesAndOffersByOfferExhibitor(exhibitorId:string,typeOffer:string):Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/getCountStagesAndOffersByOfferExhibitor/"+exhibitorId+'/'+typeOffer)
  }
  ///api/Application/getCountApplicationsByOfferANdTypeOffer/{typeOffer}
  getCountApplicationsByOfferANdTypeOffer(typeOffer:string):Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/getCountApplicationsByOfferANdTypeOffer/"+typeOffer)
  }
  ///api/Application/getRecommendedOffersForUserApp/{idUser}
  getRecommendedOffersForUserApp(idUser:string):Observable<any>
  {
    return this.http.get<any>(this.offerUrl+"/getRecommendedOffersForUserApp/"+idUser)
  }
  //rechercheOffre/{titre}
  rechercheOffre(tritre:string):Observable<any>{
    return this.http.get<any>(this.offerUrl+"/rechercheOffre/"+tritre);
  }
  //PYTHON
  searchInCV(id:string,mot_cle:string):Observable<any>{
    //return this.http.get<Offer[]>(this.offerUrl+'/consumeFlaskEndpoint/'+id);
    return this.http.get<any>("http://localhost:8000/recherche/"+id+"/"+mot_cle);
  }
}
