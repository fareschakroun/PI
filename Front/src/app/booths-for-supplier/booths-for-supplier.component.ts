import { Component, OnInit } from '@angular/core';
import { Booth } from 'projects/back-office/src/app/models/Booth';
import { BoothRepresentation } from 'projects/back-office/src/app/models/BoothRepresentation';
import { ServicebackService } from 'projects/back-office/src/app/services/serviceback.service';
import Swal from 'sweetalert2';
import { ServicefrontService } from '../services/servicefront.service';

@Component({
  selector: 'app-booths-for-supplier',
  templateUrl: './booths-for-supplier.component.html',
  styleUrls: ['./booths-for-supplier.component.scss']
})
export class BoothsForSupplierComponent implements OnInit{

  isDragDisabled : boolean = true
  selectedImage: string | ArrayBuffer | null = '../../assets/images/Floor_plans_of_Sacred_Heart_School.jpg';
  booth:Booth = {
    id:0,
    x:0,
    y: 0 ,
    boothType : '' ,
    boothname: '' ,
  
   
  }
  boothOwnershipMap: { [boothName: string]: boolean } = {};
  storedPositions:{ x: number, y: number }[] = [];
  storedNames : string [] = [];
  storedMediumPositions:{ x: number, y: number }[] = [];
  storedMediumNames : string [] = [];
  storedBigBoothsPositions:{ x: number, y: number }[] = [];
  storedBigBoothsNames : string [] = [];

  
boothRepresentationList : BoothRepresentation[] = []

boothList : Booth[]= [];
  boothNames : string[] = [];
  unsavedChanges = false; // Initialize as false
  MediumboothNames : string[] = [];
  BigboothNames : string[] = [];
  // Initialize as false
  initialPositions: { x: number; y: number }[] = [];
  initialPositionsMediumBooths: { x: number; y: number }[] = [];
  initialPositionsBigBooths: { x: number; y: number }[] = [];
  VirtualPositions : { x: number; y: number }[] = [];
  wantAddBox =false ;
  constructor(private serviceBooth : ServicebackService,private serviceFront:ServicefrontService){}
  
  sustractionVarList : number[] = [] ;
  substractionVar : number = 0 ;

 userID: number ;

  getExhibitorId(boothname: string) {
    this.serviceFront.findSupplierIdByBooth(boothname).subscribe((data: number) => {
      console.log("INCOMING ID DATA ")
      console.log(data)
      this.userID = parseInt(localStorage.getItem("userID"));

      this.boothOwnershipMap[boothname] = (data === this.userID);
    });
  }


  ngOnInit(): void {
   
    this.serviceBooth.getBoothRepresentation().subscribe((data:BoothRepresentation[])=>{
      this.boothRepresentationList = data ;
      console.log("BOOTH REPRESENTATION DATA")
      console.log( this.boothRepresentationList);

    });
    this.serviceBooth.getBooths().subscribe((data:Booth[])=>{
      this.boothList= data
   
      console.log("BOOTHLIST ")
      console.log(this.boothList)


      for (let booth of this.boothList) {
       
      
         if(booth.boothType === 'small'){
          const { x, y } = booth;
          
          this.storedPositions.push({ x: x, y: y });
          this.storedNames.push(booth.boothname)
         }
         if(booth.boothType === 'medium'){
          const { x, y } = booth;
        
          this.storedMediumPositions.push({ x: x, y: y });
          this.storedMediumNames.push(booth.boothname)
         }
         if(booth.boothType === 'big'){
          const { x, y } = booth;

          
        
          this.storedBigBoothsPositions.push({ x: x, y: y });
          this.storedBigBoothsNames.push(booth.boothname)
          console.log("STORED BIG BOOTHS LIST ")
          console.log(this.storedBigBoothsPositions)
         }
        /* const storedPositionsMediumBooths = localStorage.getItem('initialPositionsMediumBooths');
        const storedNamesMediumBooths = localStorage.getItem('mediumBoothNames');
        const storedBigboothspositions = localStorage.getItem('intialBigBoothsPositions');
        const sotreBigboothsNames = localStorage.getItem('bigBoothNames'); */
        
      }
     
    
        this.initialPositions = this.storedPositions;
        this.boothNames = this.storedNames;
        this.boothNames.forEach(boothName => {
          console.log(boothName);
          this.getExhibitorId(boothName);
        });
       
        this.MediumboothNames = this.storedMediumNames;

        this.MediumboothNames.forEach(boothName => {
          console.log(boothName);
          this.getExhibitorId(boothName);
        });
        this.initialPositionsMediumBooths = this.storedMediumPositions;
        this.BigboothNames = this.storedBigBoothsNames
        this.BigboothNames.forEach(boothName => {
          console.log(boothName);
          this.getExhibitorId(boothName);
        });
        this.initialPositionsBigBooths = this.storedBigBoothsPositions

       
  })


this.initialPositions = this.boothNames.map(() => ({ x: this.xPositon, y: this.yPositon }));
    this.initialPositionsMediumBooths = this.MediumboothNames.map(() => ({ x: this.xPositon, y: this.yPositon }));
    this.initialPositionsBigBooths = this.BigboothNames.map(() => ({ x: this.xPositon, y: this.yPositon }));

  }

  xPositon : number=-75.4 ;
  yPositon: number ;
  findBoothByName(boothCompare: Booth): Booth  {
    return this.boothList.find(booth =>  booth.boothname === boothCompare.boothname);
  }
  tooltipTextt: string = 'test';
  tooltipText(boothname:string){
    this.serviceFront.checkifReserved(boothname).subscribe((data:any)=>{

      if(data == true){
        this.tooltipTextt="This booth is reserved"
      }else {
        this.tooltipTextt="You can reserve this booth"
      }
     

    })
   
  }
  OnBoothClick(boothname:string){

   this.serviceFront.checkifReserved(boothname).subscribe((data:any)=>{
    if(data==true){
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'This Booth Is Reserved',
        showCancelButton: true,
        confirmButtonText: 'OK',
       
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with the action
        } else {
          // Cancel the action
        }
      });
    }else{
      Swal.fire({
        title: 'Confirmation',
        text: "Confirm Booth Reservation ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // If confirmed
          console.log('Confirmed');
          this.serviceFront.affectBoothToExhibitor(boothname,this.userID).subscribe((data:any)=>{
            console.log(data)
           
            console.log("HAMMMMMMMMMMMMMMMMMMMAA")
            console.log(this.boothList)
           
            
              location.reload();
         
            
           
          });
        } else {
          // If canceled
          console.log('Canceled');
          // Do something when canceled
        }
      });
    }

   })
   
  }


}
