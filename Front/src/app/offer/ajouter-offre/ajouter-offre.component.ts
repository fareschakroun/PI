import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { OfferService } from 'src/app/services/offer.service';
import { UserAnasService } from 'src/app/services/user-anas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent implements OnInit{

  constructor(private offerService:OfferService, private route:Router,private userS:UserAnasService){  }

  selectedFile!: File;
  offerType!: string;
  uploadProgress!: number;

  offerForm!:FormGroup;
  offer!:Offer;
  formData = new FormData();
  user!:User;
  fileExtension!:any;
  //params = new HttpParams();
  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit(): void {
    //this.id=this.acr.snapshot.params['id']
    this.user=JSON.parse(localStorage.getItem("user"))
    //this.user=this.userS.getUser();
    this.offerForm=new FormGroup({
      description:new FormControl('',[Validators.required,Validators.minLength(10)]),
      lastDateApplication:new FormControl('',Validators.required),
      nbrCandidature:new FormControl('',Validators.required),
      file:new FormControl('',Validators.required),
      titre:new FormControl('',Validators.required),
    })
  }
    get description(){return this.offerForm.get('description')}
    get lastDateApplication(){return this.offerForm.get('lastDateApplication')}
    get nbrCandidature(){return this.offerForm.get('nbrCandidature')}
    get file(){return this.offerForm.get('file')}
    get typeOffre(){return this.offerForm.get('typeOffer')}
    get titre(){return this.offerForm.get('titre')}


    //FILE

  onFileSelected(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList && fileList.length > 0) {
    if (fileList[0].name.split('.').pop() == "pdf"){

    this.selectedFile = fileList[0];
    }
    else {
      Swal.fire({
            icon: 'warning',
            title: 'Erreur',
            text: "Le fichier doit etre pdf"
        });
        this.fileInput.nativeElement.value = null;
    }
  }
}

  selectType(event : any):void{
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    this.offerType = selectedValue;
    console.log("offre selectionne : "+this.offerType);
    console.log("ooo"+this.titre?.value)
  }

    //End File
    add(){
      this.offer=this.offerForm.value; 
      this.formData.append('titre', this.titre?.value);
      this.formData.append('description', this.description?.value);
      this.formData.append('lastDateApplication', this.lastDateApplication?.value);
      this.formData.append('nbrCandidature', this.nbrCandidature?.value);
      this.formData.append('file', this.selectedFile);
      this.formData.append('exibitorId',this.user.id.toString());
      this.formData.append('typeOffer',this.offerType);

      
      if (this.description?.value=='' || this.lastDateApplication?.value=='' || this.nbrCandidature?.value=='' || this.file?.value=='' || this.typeOffre?.value=='' || this.titre?.value==''){
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Completeter tous les champs"
        });
      }
      else if (new Date(this.lastDateApplication?.value) < new Date()) {
          Swal.fire({
            icon: 'warning',
            title: 'Erreur',
            text: "La date doit etre superieur a la date"
        });
      }
      else if (this.nbrCandidature?.value<0) {
          Swal.fire({
            icon: 'warning',
            title: 'Erreur',
            text: "Le nombre doit etre > 0"
        });
      }
      else if (this.selectedFile==null) {
          Swal.fire({
            icon: 'warning',
            title: 'Erreur',
            text: "Veillez choisir un fichier"
        });
      }
      else if (this.selectType==null) {
          Swal.fire({
            icon: 'warning',
            title: 'Erreur',
            text: "Veillez choisir  le type d'offre"
        });
      }
      else{
        this.offerService.addOffer(this.formData).subscribe(()=>{
        console.log( "l'offre a été ajoutée")
        console.log("notre form"+JSON.stringify(this.offerForm.value))})
        this.route.navigate(['/offers']);
        
    }
  }

}
