import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray,CdkDragMove} from '@angular/cdk/drag-drop';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ServicebackService } from '../services/serviceback.service';
import { Booth } from '../models/Booth';

import Swal from 'sweetalert2';
import { Supplier } from '../models/Supplier';
import { supplierUser } from '../models/SupplierUser';
import { BoothRepresentation } from '../models/BoothRepresentation';

@Component({
  selector: 'app-boothplacement',
  templateUrl: './boothplacement.component.html',
  styleUrls: ['./boothplacement.component.scss'],
  

})
export class BoothplacementComponent  implements OnInit{
  
  selectedImage: string | ArrayBuffer | null = '../../assets/images/Floor_plans_of_Sacred_Heart_School.jpg';


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  //init booth : 
  booth:Booth = {
    id:0,
    x:0,
    y: 0 ,
    boothType : '' ,
    boothname: '' ,
  
   
  }
////////////////////////////////////////////store///////////////////////////////////////////////////
 storedPositions:{ x: number, y: number }[] = [];
     storedNames : string [] = [];
     storedMediumPositions:{ x: number, y: number }[] = [];
     storedMediumNames : string [] = [];
     storedBigBoothsPositions:{ x: number, y: number }[] = [];
     storedBigBoothsNames : string [] = [];

/////////////////////////////supplier /////////////////////////////////////
supplierList : supplierUser[] = []

/////////////////////////////booth representation /////////////////////////////////////


boothRepresentationList : BoothRepresentation[] = []

/////////////////////////////supplier List /////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////



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
  constructor(private dialog: MatDialog,private serviceBooth : ServicebackService){}
  sustractionVarList : number[] = [] ;
  substractionVar : number = 0 ;
  chooseBox(size: string): void {

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    if( size === 'small'){
    //const nextBoothNumber = this.boothNames.length + 1;
    this.serviceBooth.getBoothSequence(size).subscribe((response : number)=>{
      const nextBoothNumber =response ;
      this.serviceBooth.incrementBoothSequence(size).subscribe((response)=>{
        console.log("sequence incremented ")
      })
      this.boothNames.push(`Booth small ${nextBoothNumber}`);
      this.initialPositions.push({ x , y });
    })
   
    
    //localStorage.setItem('boothNames', JSON.stringify(this.boothNames))
   
    
    }
    if( size === 'medium'){
    //const nextMediumBoothNumber = this.MediumboothNames.length + 1;
    this.serviceBooth.getBoothSequence(size).subscribe((response : number)=>{
      const nextMediumBoothNumber = response;
      this.serviceBooth.incrementBoothSequence(size).subscribe((response)=>{
        console.log("sequence incremented ")
      })
    this.MediumboothNames.push(`Booth medium ${nextMediumBoothNumber}`);
    
    this.initialPositionsMediumBooths.push({ x , y });

    })
     //localStorage.setItem('mediumBoothNames', JSON.stringify(this.MediumboothNames))
  }
    
  if( size === 'big'){

    this.serviceBooth.getBoothSequence(size).subscribe((response : number)=>{
      const nextBigBoothNumber = response;
      this.serviceBooth.incrementBoothSequence(size).subscribe((response)=>{
        console.log("sequence incremented ")
      })
    this.BigboothNames.push(`Booth big ${nextBigBoothNumber}`);
    
    this.initialPositionsBigBooths.push({ x , y });

    })



   // const nextBigBoothNumber = this.BigboothNames.length + 1;
   // this.BigboothNames.push(`Booth big ${nextBigBoothNumber}`);
   // this.initialPositionsBigBooths.push({ x , y });
   /*  this.serviceBooth.getBoothSequence(size).subscribe((response : number)=>{
      const nextBigBoothNumber = response;
      this.serviceBooth.incrementBoothSequence(size).subscribe((response)=>{
        console.log("sequence incremented ")
      })
    this.BigboothNames.push(`Booth big ${nextBigBoothNumber}`);
    
    this.initialPositionsBigBooths.push({ x , y });

    }) */
   //  localStorage.setItem('bigBoothNames', JSON.stringify(this.BigboothNames))
  }
    // Get the position where the box was clicked
  
    
   
   
    this.VirtualPositions.push({ x:0,y: 0 });
    this.sustractionVarList.push(this.substractionVar)
    console.log(this.initialPositions)
    console.log(this.VirtualPositions)
    console.log(this.sustractionVarList)
    this.substractionVar += 75 ;
    
    
   
  }

  ngOnInit(): void {
    this.serviceBooth.getBoothRepresentation().subscribe((data:BoothRepresentation[])=>{
      this.boothRepresentationList = data ;
      console.log("BOOTH REPRESENTATION DATA")
      console.log( this.boothRepresentationList);

    });


  
    /////supplier list
    this.serviceBooth.getAllUserSuppliers().subscribe((data :supplierUser[])=>
    {
      this.supplierList = data ;
    }
    
    )

    /////booth list
    this.serviceBooth.getBooths().subscribe((data:Booth[])=>{
      this.boothList= data
    
      console.log("RETURNED DATA ")
      console.log(data);
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
         }
        /* const storedPositionsMediumBooths = localStorage.getItem('initialPositionsMediumBooths');
        const storedNamesMediumBooths = localStorage.getItem('mediumBoothNames');
        const storedBigboothspositions = localStorage.getItem('intialBigBoothsPositions');
        const sotreBigboothsNames = localStorage.getItem('bigBoothNames'); */
        
      }
     
    
        this.initialPositions = this.storedPositions;
        this.boothNames = this.storedNames;
        this.MediumboothNames = this.storedMediumNames;
        this.initialPositionsMediumBooths = this.storedMediumPositions;
        this.BigboothNames = this.storedBigBoothsNames
        this.initialPositionsBigBooths = this.storedBigBoothsPositions
       
  })

  /*  console.log("booth list ")
    console.log(this.boothList) */


    this.initialPositions = this.boothNames.map(() => ({ x: this.xPositon, y: this.yPositon }));
    this.initialPositionsMediumBooths = this.MediumboothNames.map(() => ({ x: this.xPositon, y: this.yPositon }));
    this.initialPositionsBigBooths = this.BigboothNames.map(() => ({ x: this.xPositon, y: this.yPositon }));
   /*  console.log("Initial positions :" +this.initialPositions) */
   
   
    
    
    //supplierpart

  }



   xPositon : number=-75.4 ;
   yPositon: number ;
  dragEnd(event: CdkDragEnd, index: number): void {
    // Get the position of the dropped element
    const xPosition = event.source.getFreeDragPosition().x;
    const yPosition = event.source.getFreeDragPosition().y;
  
    console.log('Dropped element position (x, y):', xPosition, yPosition);
   // Check if position has changed
    if (xPosition !== this.initialPositions[index].x || yPosition !== this.initialPositions[index].y) {
    this.unsavedChanges = true; 
     this.xPositon += 75.4 ;
     // Update the initial position based on the new coordinates
      this.initialPositions[index] = { x: xPosition, y: yPosition }; 
      
   console.log(this.initialPositions)

   } 
  }
  dragEndMedium(event: CdkDragEnd, index: number): void {
    // Get the position of the dropped element
    const xPosition = event.source.getFreeDragPosition().x;
    const yPosition = event.source.getFreeDragPosition().y;
  
    console.log('Dropped element position (x, y):', xPosition, yPosition);
   // Check if position has changed
    if (xPosition !== this.initialPositionsMediumBooths[index].x || yPosition !== this.initialPositionsMediumBooths[index].y) {
    this.unsavedChanges = true; 
     this.xPositon += 75.4 ;
     // Update the initial position based on the new coordinates
      this.initialPositionsMediumBooths[index] = { x: xPosition, y: yPosition }; 
      
   console.log(this.initialPositions)

   } 
  }
  dragEndBig(event: CdkDragEnd, index: number): void {
    // Get the position of the dropped element
    const xPosition = event.source.getFreeDragPosition().x;
    const yPosition = event.source.getFreeDragPosition().y;
  
    console.log('Dropped element position (x, y):', xPosition, yPosition);
   // Check if position has changed
    if (xPosition !== this.initialPositionsBigBooths[index].x || yPosition !== this.initialPositionsBigBooths[index].y) {
    this.unsavedChanges = true; 
     this.xPositon += 75.4 ;
     // Update the initial position based on the new coordinates
      this.initialPositionsBigBooths[index] = { x: xPosition, y: yPosition }; 
      
   console.log(this.initialPositions)

   } 
  }
  findBoothByName(boothCompare: Booth): Booth  {
    return this.boothList.find(booth =>  booth.boothname === boothCompare.boothname);
  }
  confirmChanges(): void {
   
    console.log('User confirmed changes');
    console.log(this.initialPositions);
    localStorage.setItem('initialPositions', JSON.stringify(this.initialPositions));
    
    for (let i = 0; i < this.initialPositions.length; i++) {
        const index = this.initialPositions[i];
        
        // Create a new instance of 'this.booth' for each iteration
        const booth: Booth = {
          id: 0 ,
            boothname: this.boothNames[i],
            x: index.x,
            y: index.y,
            boothType: 'small',
           
        };
        
        const boothsmall = this.findBoothByName(booth);
        console.log("found booth !");
        console.log(boothsmall);
        
        if (boothsmall) {
            booth.id = boothsmall.id;
        }
        
        this.serviceBooth.AddBooth(booth).subscribe((response: any) => {
            console.log(response);
        });
    }
  for (let i = 0; i < this.initialPositionsMediumBooths.length; i++) {
    const index = this.initialPositionsMediumBooths[i];
    const booth: Booth = {
      id: 0 ,
        boothname: this.MediumboothNames[i],
        x: index.x,
        y: index.y,
        boothType: 'medium',
        
    };

    const boothMedium = this.findBoothByName(booth);
      console.log("found booth !")
      console.log(boothMedium)
      
      if (boothMedium) {
        booth.id= boothMedium.id
       
      } 
    console.log(this.booth)
    this.serviceBooth.AddBooth(booth).subscribe((response:any) =>{
      console.log(response)
    });
}
for (let i = 0; i < this.initialPositionsBigBooths.length; i++) {
  const index = this.initialPositionsBigBooths[i];
  const booth: Booth = {
    id: 0 ,
      boothname: this.BigboothNames[i],
      x: index.x,
      y: index.y,
      boothType: 'big',
      
  };

  const boothbig = this.findBoothByName(booth);
      console.log("found booth !")
      console.log(boothbig)
      
      if (boothbig) {
        booth.id= boothbig.id
      
      } 
  console.log(this.booth)
  this.serviceBooth.AddBooth(booth).subscribe((response:any) =>{
    console.log(response)
  });
}
    localStorage.setItem('initialPositionsMediumBooths', JSON.stringify(this.initialPositionsMediumBooths));
    localStorage.setItem('intialBigBoothsPositions', JSON.stringify(this.initialPositionsBigBooths));
    
      this.showAlert();
      setTimeout(() => {
        location.reload()
      }, 1000); // Adjust the delay time as needed
      
  }
showCard : boolean = false ;
  cancelChanges(): void {
    // Revert booth positions to initial state
    //console.log(`User canceled changes for booth ${this.boothNames[index]}`);
    console.log('User canceled changes');
    this.unsavedChanges = false; // Reset flag
  }

/*   @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    if (this.unsavedChanges) {
      return window.confirm('You have unsaved changes. Do you want to leave?');
    }
    return true; // No changes, allow deactivation
  }
  */
 log(){
  console.log(this.storedNames)
 }
 showAlert() {
  Swal.fire({
    title: 'Operation succeeded!',
    text: 'Booth positions have changed !',
    icon: 'success',
    showConfirmButton : false 
    
  });
}
options: string[] = ['Option 1', 'Option 2', 'Option 3']; // Your array of items
showList(boothName: string) {
  console.log(this.boothList)
  let buttonsHtml = '';
  this.supplierList.forEach(option => {
    
      buttonsHtml += `<button class="btn btn-primary" style="margin:20px;;">${option.nom}</button>`;
    
    
  });

  Swal.fire({
    title: 'Select an option',
    html: buttonsHtml,
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    allowOutsideClick: false,
    preConfirm: () => {
      // Find the selected button
      const selectedButton = document.querySelector('.swal2-popup button.selected');
      // Return the text content of the selected button
      return selectedButton ? selectedButton.textContent.trim() : null;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedOption = result.value;
      const selectedSupplier = this.supplierList.find((item) => item.nom == result.value)
      if(selectedSupplier){
      const booth  = this.boothList.find((item) => item.boothname === boothName)
     
     console.log(booth)
      this.serviceBooth.affectSupplierTobooth(boothName,selectedSupplier.id).subscribe((response: any)=>{
        console.log("BOOTH AFTER AFFECTING SUPPLIER")
        console.log(response)
        console.log(this.boothRepresentationList)
      })
      }
      Swal.fire('Selected', `You selected: ${selectedOption}`, 'success');
      setTimeout(()=> 
      {
        location.reload();
      },1000)
    }
  });

  // Add event listener to handle button clicks
  setTimeout(() => {
    document.querySelectorAll('.swal2-popup button').forEach((button: any) => {
      button.addEventListener('click', () => {
        // Deselect all buttons
        document.querySelectorAll('.swal2-popup button').forEach((btn: any) => {
          btn.classList.remove('selected');
        });
        // Select the clicked button
        button.classList.add('selected');
      });
    });
  });
}

selectOption(option: string): void {
  // Deselect all buttons
  document.querySelectorAll('.swal2-popup button').forEach((btn: any) => {
    btn.classList.remove('selected');
  });
  // Select the clicked button
  document.querySelector(`.swal2-popup button:contains(${option})`).classList.add('selected');
}


removeBooth(boothName : string){
  const boothindex = this.boothList.findIndex((item) => item.boothname == boothName)
  const booth = this.boothList.find((item) => item.boothname == boothName)
  console.log(booth);
  Swal.fire({
    title: "Are you sure?",
    text: "The chosen booth will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      if(boothindex !== -1){
        this.serviceBooth.deleteBooth(booth).subscribe((response : any) =>{
     
          this.boothList.splice(boothindex, 1);

      
          Swal.fire({
            title: "Deleted!",
            text: "the Booth has been deleted.",
            icon: "success",
            showConfirmButton: false // This line removes the "OK" button
          
          });
          setTimeout(()=>
          location.reload()
          
          ,1000)
        
         
    
        } )
      }

     
    }
  });
  

}


}
