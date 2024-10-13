import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Offer, typeOffer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { CandidatureService } from 'src/app/services/candidature.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserAnasService } from 'src/app/services/user-anas.service';
import { LowerCasePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-afficher-offre',
  templateUrl: './afficher-offre.component.html',
  styleUrls: ['./afficher-offre.component.css']
})



export class AfficherOffreComponent implements OnInit{

  constructor(private offerService:OfferService,private candidatureService:CandidatureService,private userS:UserAnasService,private userService:UserService){  }
  
  exibitorId!:number;
  listOffers:any;
  listStages:any;
  listJobs:any;
  listRecommanderBack!:any;
  //listRecommander!:Object;
  listRecommander!:any;
  lisRecFinal: any[] = [];
  pourcentageOffre: number[] = [];
  listRecherche!:any;
  user!:any;
  titre:string='';
  
  ngOnInit(): void {
    console.log(localStorage.getItem("userID"))
     //this.getUser(localStorage.getItem("userID"))
     this.user=JSON.parse(localStorage.getItem("user"))
    if (this.user.role=="exhibitor"){
      console.log(this.user.password)
      this.getOffersByExibitor(this.user.id.toString());
      this.getOffersTypeJobByExibitor(this.user.id.toString());
      this.getOffersTypeStageByExibitor(this.user.id.toString());
    }
    else {
      console.log(this.user.password)
      this.getOffersForUser();
      this.getJobsForUser();
      this.getStagesForUser();
      this.getOffresRecommanderPourUser(this.user.id.toString());
    }
  
  }


  onInputChange() {
    // Logique de votre méthode ici
    console.log('Une lettre a été ajoutée:', this.titre);
    /*if(this.titre != ""){
      console.log("mehech null") 
      this.candidatureService.rechercheOffre(this.titre).subscribe(data=>{
      this.listOffers=data
      console.log(data);
    })  
    }
      else{
        console.log("null")
        this.getOffersForUser();
      }*/
    /**/

  }

  getOffersForUser(){
    this.candidatureService.nbrApplicationOnOffer().subscribe(res=>{
        //this.nbrCandidature.push(res);
        this.listOffers=res;
        this.listRecommander=res;
      })
  }
  getJobsForUser(){
    this.candidatureService.getCountApplicationsByOfferANdTypeOffer("job").subscribe(res=>{
        //this.nbrCandidature.push(res);
        this.listJobs=res;
      })
  }
  getStagesForUser(){
    this.candidatureService.getCountApplicationsByOfferANdTypeOffer("stage").subscribe(res=>{
        //this.nbrCandidature.push(res);
        this.listStages=res;
      })
  }
  getOffresRecommanderPourUser(id:string){
    /*this.candidatureService.getRecommendedOffersForUserApp(id).subscribe(res=>{
      this.listRecommander=res
      console.log("HHH"+this.listRecommander)
    })*/
    this.offerService.getRecommandedOffersForUser(id).subscribe(res => {
      this.listRecommanderBack=res
      //this.listRecommanderBack = res as Offer[];

    for (let i = 0; i < this.listRecommanderBack.length; i++) {
    let of = this.listRecommanderBack[i];

    for (let i = 0; i < this.listRecommander.length; i++) {
      let offre = this.listRecommander[i];
      if (of.id==offre[0].id)
      {
        this.lisRecFinal.push(offre);
        this.pourcentageOffre.push(of.pourcentage);
        console.log(offre[0]);
      }
    }
    for (let i=0; i< this.lisRecFinal.length ; i++) {
      this.lisRecFinal[i][5] =  this.pourcentageOffre[i]// Remplacez "Valeur de o[5]" par la valeur souhaitée
    }
    console.log(this.lisRecFinal+"KKKK")

    //console.log(offre.id);
    }

    //console.log(titres)
      console.log(JSON.stringify(this.listOffers.length))
    })
  }

  getOffersByExibitor(id:string){
    this.candidatureService.getCountApplicationsByOfferExhibitor(id).subscribe(data=>{
    this.listOffers=data
    }) 
  }

  getOffersTypeStageByExibitor(id:string){
    this.candidatureService.getCountStagesAndOffersByOfferExhibitor(id,"stage").subscribe(data=>{
    this.listStages=data})
  }

  getOffersTypeJobByExibitor(id:string){
    this.candidatureService.getCountStagesAndOffersByOfferExhibitor(id,"job").subscribe(data=>{
    this.listJobs=data})
  }


  detail(){
    alert('Your details are displayed'+this.listOffers[0]['file']) //
  }


}