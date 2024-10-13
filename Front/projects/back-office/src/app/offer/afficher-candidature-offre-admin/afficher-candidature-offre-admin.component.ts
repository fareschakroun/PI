import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidature } from 'src/app/models/candidature';
import { CandidatureService } from 'src/app/services/candidature.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-afficher-candidature-offre-admin',
  templateUrl: './afficher-candidature-offre-admin.component.html',
  styleUrls: ['./afficher-candidature-offre-admin.component.css']
})
export class AfficherCandidatureOffreAdminComponent implements OnInit{
  id!:number;
  listCandidatures:Candidature[]=[]
  listUsers:any[] = [];
  constructor(private activateroute:ActivatedRoute,private route:Router,private candidatureService:CandidatureService,private userService:UserService){}
  ngOnInit(): void {
    this.id=this.activateroute.snapshot.params['id'];
    this.getAllAppByOffer()
  }
  getAllAppByOffer(){
      this.candidatureService.getAllApplicationsByOffer(this.id).subscribe((data:Candidature[])=>{
    this.listCandidatures=data
    for (let i of data){
      this.userService.getUser(i.idCandidat.toString()).subscribe((data:any)=>{
      console.log("AAA",data["firstname"])
      const newItem: any = { "firstname":data["firstname"],"lastname":data["lastname"] };
      this.listUsers.push(newItem);
    })
      console.log(i.idCandidat,"éééé");
    }
    console.log("mylist:"+JSON.stringify(this.listCandidatures))
    })
  }

}
