import { Component, OnInit } from '@angular/core';
import { ServicebackService } from './services/serviceback.service';
/* import $ from 'jquery'; */

import { ElementRef, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{


  title = 'ProjetPi';
  public notifications = 0;
  message !: string ;
  
  token = localStorage.getItem("token");
  constructor(private serviceback: ServicebackService,private router: Router) {
   /*  this.webSocketService.connect().subscribe(() => {
      // Abonnez-vous aux notifications de paiement
      
    }); */
  }
  ngOnInit(): void {
    

   /*  $(document).on("click", "notificationReadJava", function() {
      alert("Test");
    }); 

    this.serviceback.getNotificationCount(2).subscribe((data:number)=>{
      this.notifications= data ;
      console.log("NOTIFICATIONSSSSss")
      console.log(data);
    }) */
   
    
      
  
   }
  marknotificationAsread(){

    console.log("notification bell clicked")
    console.log("notification bell clicked")
    console.log("notification bell clicked")
    console.log("notification bell clicked")
    this.serviceback.markAsread(2).subscribe((data:any)=>{
      console.log(data);
    });
    this.serviceback.getNotificationCount(2).subscribe();

  }



    //this.router.navigate(['/new-page']);
  //user!:User;
  user=JSON.parse(localStorage.getItem("user"));


disconnect(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userID");
  this.user=""
  this.token=""
}
  

    // Connectez-vous au WebSocket
   
   
  



}




   
    

  


