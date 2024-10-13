import { Component, OnInit, NO_ERRORS_SCHEMA, ElementRef, ViewChild, TemplateRef  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { CandidatureService } from 'src/app/services/candidature.service';
import { OfferService } from 'src/app/services/offer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse } from '@angular/common/http';
//import { saveAs } from 'file-saver';
import { UserAnasService } from 'src/app/services/user-anas.service';
import { User } from 'src/app/models/user';
import { DatePipe } from '@angular/common';
//import { BarcodeFormat } from '@zxing/library';
//import { Result } from '@zxing/library';
//import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.css']
})
export class DetailOffreComponent implements OnInit{
  offer!:Offer;
   id=0
   titre:string='';
   data!:any;
   blob !:any;
   fileUrl!:any;
   formData = new FormData();
   modalReference :any; 
   selectedFile!: File;
   listApplied:number[]=[]
   applied!:boolean;
   user!:User;
   currentDate!:Date;
   comparaisonDate!:boolean;
   entr!:any;
     @ViewChild('fileInput') fileInput!: ElementRef;

  @ViewChild('content', { static: true }) contentRef!: TemplateRef<any>;

  onScanSuccess(scanResult: string): void {
    console.log('Scan result:', scanResult);
    // Handle the scan result here
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
    // Handle the scan error here
  }

  //currentDevice: MediaDeviceInfo |undefined ;
  //currentDevice: MediaDeviceInfo | null = new MediaDeviceInfo();
   currentDevice!: MediaDeviceInfo;

  constructor(private activateroute:ActivatedRoute,private offerService:OfferService,
    private route:Router,private candidatureService:CandidatureService,
    private modalService: NgbModal,private http: HttpClient,private userS:UserAnasService,
    private userService:UserService){
  }
  ngOnInit(): void {
    this.currentDate=new Date()
    //this.user=this.userS.getUser();
    this.user=JSON.parse(localStorage.getItem("user"))
    this.id=this.activateroute.snapshot.params['id'];
    this.hasApplied(this.user.id.toString(),this.id.toString());
    this.offerService.getOfferById(this.id).subscribe((data)=>{
    this.offer=data
    this.entr=this.userService.getUser(this.offer.exibitorId.toString());
    this.getEntreprise();
    this.comparaisonDate=new Date(this.offer.lastDateApplication)>this.currentDate;
    console.log("COMPARAISON"+this.comparaisonDate)
    //console.log("une offre:"+JSON.stringify(this.offer))
    console.log("DATEOFFRE",this.offer.lastDateApplication)
    console.log("NOTRE DATE"+this.currentDate)
    })
    this.data = 'some text';
    this.blob = new Blob([this.offer.file], { type: 'application/octet-stream' });
    this.fileUrl = window.URL.createObjectURL(this.blob);
  }

  getEntreprise(){
    this.userService.getUser(this.offer.exibitorId.toString()).subscribe((data:any)=>{
      console.log("AAA",data)
      this.entr=data;
    })
  }

  getPourcentageMatch(idO:string,idU:string){
      console.log("aaa")
    this.offerService.getPourcentageMatch(idO,idU).subscribe((data:any)=>{
      console.log(data)
      console.log("aaa")
      this.titre=data;
    })
    let timerInterval:any;
    const buttonElement = document.createElement('button');
        Swal.fire({
          title: "Checking the CV.!",
          html: "Data processing.",
          timer: 13000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading(buttonElement);
            /*const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);*/
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
          this.openLg(this.contentRef);
        });
  }


  hasApplied(idUser:string,idOffer:string){
  this.offerService.hasApplied(idUser,idOffer).subscribe((data:any)=>{
  this.applied=data
  console.log("offerApplied:"+JSON.stringify(this.applied))
    })
  }

  supprimer(){
    this.offerService.deleteOffer(this.offer.id).subscribe(()=>{
      this.route.navigate(['/offers'])
    })
    
  }
  /*onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }*/

  onFileSelected(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList && fileList.length > 0) {
    console.log(fileList[0].name.split('.').pop())
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

  postuler(){
      this.formData.append('idOffer', this.id.toString());
      this.formData.append('file', this.selectedFile);
      this.formData.append('idCandidat',this.user.id.toString());
      /*if (this.description?.value=='' || this.lastDateApplication?.value=='' || this.nbrCandidature?.value=='' || this.file?.value==''){
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Completeter tous les champs"
        });
      }*/
      //else{
        this.candidatureService.addApplication(this.formData).subscribe(()=>{
        console.log( "l'offre a été ajoutée")
        Swal.fire({
            icon: 'success',
            title: 'ok',
            text: "Un mail de confirmation vous a été envoyé"
        });
        this.modalReference.close();
        //console.log("notre form"+JSON.stringify(this.offerForm.value))})
        this.route.navigate(['/offers']);
        
        
    })
  }
  openLg(content: TemplateRef<any>) {
        this.modalReference=this.modalService.open(content, { size: 'md'});
        //this.getPourcentageMatch(this.offer.id.toString());
      }


      
  ///////FILE


   telechargerDocument(id: number) {
    const url = 'http://localhost:8899/api/Offer/telecharger-pdf/'+id;
    this.http.get(url, { observe: 'response', responseType: 'blob' })
      .subscribe((response: HttpResponse<Blob>) => {
        this.telechargerFichier(response.body);
      });
  }

  telechargerFichier(data: Blob | null) {
  if (data !== null) {
    const nomFichier = this.offer.exibitorId+'.pdf';
    //saveAs(data, nomFichier);
  }
}

//currentDevice: MediaDeviceInfo | null = null;

/*onScanSuccess(result: string): void {
    const jsonObject = JSON.parse(result);
  }
*/

  /////ENDFILE
}


