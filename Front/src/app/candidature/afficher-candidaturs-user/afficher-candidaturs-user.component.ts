import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/models/candidature';
import { User } from 'src/app/models/user';
import { CandidatureService } from 'src/app/services/candidature.service';
import { UserAnasService } from 'src/app/services/user-anas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-afficher-candidaturs-user',
  templateUrl: './afficher-candidaturs-user.component.html',
  styleUrls: ['./afficher-candidaturs-user.component.css']
})
export class AfficherCandidatursUserComponent implements OnInit{

  listCandidatures:Candidature[]=[]
  user!:User;
  
  listUsers:any[] = [];

  constructor(private candidatureService:CandidatureService,private userS:UserAnasService,private userService:UserService){  }
  
  ngOnInit(): void {
    //this.user=this.userS.getUser()
  this.user=JSON.parse(localStorage.getItem("user"))
  this.candidatureService.getAllApplicationsByUser(this.user.id).subscribe((data:Candidature[])=>{
  this.listCandidatures=data
  for (let i of data){
      console.log(i["offer"]["exibitorId"])
      this.userService.getUser(i["offer"]["exibitorId"].toString()).subscribe((data:any)=>{
      console.log("AAA",data["name"])
      const newItem: any = { "name":data["name"]};
      this.listUsers.push(newItem);
    })
      console.log(i.idCandidat,"éééé");
    }
  console.log("mylist:"+JSON.stringify(this.listCandidatures))
    })
  }
  //getAllApplicationsByUser
}
