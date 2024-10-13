import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  token = localStorage.getItem("token");
  title = 'ProjetPi';
currentUser :any;

  ngOnInit(): void { 
    this.currentUser=JSON.parse(localStorage.getItem("user"));
    // Supposons que le token est stocké dans le local storage

  }


    //this.router.navigate(['/new-page']);
  //user!:User;
  user=JSON.parse(localStorage.getItem("user"));
  
  constructor( 
  
   private userserv : UserService,  private router: Router
   
  ) {}
  idRoom : number = 0 
  idCompany : number = parseInt(localStorage.getItem("userID"));
 

  redirect() {
    // Ajoutez ici la logique que vous souhaitez exécuter lorsque le bouton est cliqué
    this.userserv.getRoomId(parseInt(localStorage.getItem("userID"))).subscribe(res => {
      console.log( this.idRoom+"ff"+ this.idCompany)
      this.idRoom = res;

      this.router.navigate(['/myRooms', this.idRoom, this.idCompany]);

    });
  }

/******************** **********************/
dark(){
  const body = document.querySelector('body');
  if (body) {
    body.setAttribute('data-bs-theme',"dark");
  }
}
light(){
  const body = document.querySelector('body');
  if (body) {
    body.setAttribute('data-bs-theme',"light");
  }

}

disconnect(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userID");
  this.user=""
  this.token=""
}

/*********************************** */


}
