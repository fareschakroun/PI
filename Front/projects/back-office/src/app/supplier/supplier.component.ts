import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { status, Supplier, typerequirement } from '../models/Supplier';
import { SupplyRequest, Image } from '../models/SupplyRequest';
import { supplierUser } from '../models/SupplierUser';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServicebackService } from '../services/serviceback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booth } from '../models/Booth';

import { Message } from '@stomp/stompjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit{
  @ViewChild('controlDir', { read: FormControlName }) controlDir: FormControlName;
  @ViewChild('formDir') formDir: FormGroupDirective;
  /* imagefunction(){
    this.supplierService.addsupplier(this.supplier)
    .subscribe((response: SupplyRequest []) => {
      console.log("sent :",this.supplier)
      console.log(response);
      // Reset form after successful submission
      this.supplierService.getsupplier().subscribe((data:Supplier[])=>{
        this.SupplyRequestList= data
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'supplier added successfuly.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
    })
     
      // Optionally, you can perform other actions after submission
    });
  } */
  // image things *****************************
  image: File | null = null;
  imageMin: File | null = null;
  uploadingFile:boolean=false;
  //***************************************** */
  messages: string[] = [];

  supplierCheck : Supplier ={
    id :0,
    requirement:'String',
    quantity : 0 ,
    price: 0 ,
    boothPosition: 'String' ,
    productname: 'String' ,
    servicename: 'String',
    type : 'String' ,
    status :'String' ,
    supplier : new supplierUser,
    image:null
  }
  setStatusAccepted(requestid:number) { 
    this.supplierService.setRequestStatus(requestid, 'Approved').subscribe((data: any[]) => {
     location.reload()
    });
    

  }
  setStatusRefused(requestid:number){
    this.supplierService.setRequestStatus(requestid,'NotApproved').subscribe((data:any[]) =>
    console.log(data)
    );
    location.reload()

  }
  checkStatusfromBack(requestid: number) {
    this.supplierService.CheckStatusSupplyRequest(requestid).subscribe((response : Supplier) =>{
    this.supplierCheck = response 
    
     }
    )
   
  }
  CheckStatusToFront(requestid: number){
    this.checkStatusfromBack(requestid)
    return this.supplierCheck.status ;
  }
  getType(type: String){
    if (type === 'isProduct')
    {
      return 'Product'
    }else if (type ==='isService'){
      return 'Service'
    }else if (type === 'isProductAndService'){ return ('Product and Service')}
    else{ return type }
   
  }
  getproductName  (): string {
  return this.productNameLabel === 'Product' ? 'productname' : 'servicename';
}
  productNameLabel: string ="Product";

   SupplyRequestList: Supplier[] =[];
  supplier:SupplyRequest={
   id:0,
   requirement : "",
   quantity: 0,
   price: 0 ,
    boothPosition: '000' ,
    productname: 'String' ,
    servicename: 'String' ,
    createdAt : null,
   type : typerequirement[typerequirement.isProduct] ,
   
   image:null
   
  }

  supplierForm!:FormGroup
   numberValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value)) {
        // If the value is not a number, return an error
        return { notANumber: true };
    }
    // If the value is a number, return null (no error)
    return null;
}
  constructor(private supplierService: ServicebackService,private builder: FormBuilder,private router: Router,private acr:ActivatedRoute){
  
    this.supplierForm=this.builder.group({
   
      requirement:new FormControl('',Validators.required),
      quantity: new FormControl('', [Validators.required, this.numberValidator]),
    price: new FormControl('', [Validators.required, this.numberValidator]),
      boothPosition:new FormControl('',Validators.required),
      productname:new FormControl('',Validators.required),
      servicename:new FormControl('',Validators.required),
      productorservice:new FormControl('',Validators.required),
      
    
    })
  }
 
get quantity(){return this.supplierForm.get('quantity')}
get price(){return this.supplierForm.get('price')}


  statusString : String ;

  boothList : Booth[] = []

  testSocket(){

  }
  ngOnInit(): void {


    this.supplierService.getBooths().subscribe((data:Booth[])=>{
      this.boothList= data
    });
    console.log("passing Params "  )
    this.acr.params.subscribe((params)=>{
      this.supplierService.getsupplierItemById(params['id']).subscribe((data)=>{
        console.log(params['id'])
        console.log(data)
        this.supplier.id=params['id']
        this.supplierForm.setValue({
      requirement:data.requirement,
      quantity: data.quantity,
      price: data.price,
      boothPosition:data.boothPosition,
      productname:data.productname,
      servicename:data.servicename,
      productorservice:data.productname?'product':'service',

        })
       this.supplier.image= data.image
        console.log(this.supplierForm.value)
      })
    })
        
    
         

         
      
    
    
    console.log(
      
      this.supplierService.getsupplier().subscribe((data:Supplier[])=>{
        this.SupplyRequestList= data
        console.log(data);
    })
    )
     }
      
      
     isFormEnabled(): boolean {
      return this.productNameLabel === 'Product';
  }
    Checkform(){
      /* console.log("notre form"+JSON.stringify(this.supplierForm.value)) */
    }
    
    soloproduct : boolean = true ;
    
    onRadioChange(value : String) {
     
      if (value === 'option1') {
        //this.formDir.removeControl(this.controlDir);
    
        this.productNameLabel = 'Product';
        //this.controlDir.name =  'productname'
        this.soloproduct = true;
       
        this.supplierForm.get('servicename')?.disable();
        this.supplierForm.get('productname')?.enable();
        //this.formDir.addControl(this.controlDir);
       
      } else if (value === 'option2') {
       // this.supplierForm.reset(); 
       //this.formDir.removeControl(this.controlDir);
        this.productNameLabel = 'Service';
        //this.controlDir.name = 'servicename'
        this.soloproduct = true;
        this.supplierForm.get('productname')?.disable();
        this.supplierForm.get('servicename')?.enable();
       // this.formDir.addControl(this.controlDir);
      
        
      } else if (value === 'option3') {
        //this.formDir.removeControl(this.controlDir);
        this.soloproduct = false;
        this.productNameLabel = ''; // Provide a default value or handle other cases
       // this.controlDir.name = ''
        this.supplierForm.get('productname')?.enable();
        this.supplierForm.get('servicename')?.enable();
       // this.formDir.addControl(this.controlDir);
       
       
      }
      console.log( this.soloproduct)
      console.log(this.productNameLabel)
    }
    onSubmit(){
     // this.formDir.removeControl(this.controlDir);
      const servicename = this.supplierForm.get('productorservice').value ;
      if (servicename === 'product') {

          this.supplier.type = typerequirement[typerequirement.isProduct]
          this.supplier.servicename=""

          } else if (servicename === 'service') {

            this.supplier.type =typerequirement[typerequirement.isService];
            this.supplier.productname=""

          } 

          this.supplier.requirement=this.supplierForm.value.requirement
          this.supplier.quantity=this.supplierForm.value.quantity
          this.supplier.price=this.supplierForm.value.price
          this.supplier.boothPosition=this.supplierForm.value.boothPosition
          this.supplier.productname=this.supplierForm.value.productname
          this.supplier.servicename=this.supplierForm.value.servicename
          
          
          if(this.image==null){
            Swal.fire({
              icon: 'warning',
              title: 'Warning!',
              text: 'Image and other fields are required',
              showCancelButton: true,
              confirmButtonText: 'OK',
             
            })
          }

          this.supplierService.upload(this.image).subscribe((data)=>
          {
            
            
            this.supplier.image=data
       // Call the service to add the supplier
    this.supplierService.addsupplier(this.supplier)
    .subscribe((response: SupplyRequest []) => {
      console.log("sent :",this.supplier)
      console.log(response);
      // Reset form after successful submission
      this.supplierService.getsupplier().subscribe((data:Supplier[])=>{
        this.SupplyRequestList= data
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Supply request added successfuly.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
    })
     
      // Optionally, you can perform other actions after submission
    });
  })
      
}


fetchSupplier(id:number){

}



onFileChange(event: any) {
  this.image = event.target.files[0];
  this.imageMin = null;
  const fr = new FileReader();
  fr.onload = (evento: any) => {
    const imageMinDataUrl = evento.target.result;
    const previewImage = document.getElementById('previewImage') as HTMLImageElement;
    previewImage.src = imageMinDataUrl;
    previewImage.style.display = 'block';
  };
  if (this.image) {
    fr.readAsDataURL(this.image);
  }
}

onUploadImages() {
  this.uploadingFile=true;
  if (this.image) {
    this.supplierService.upload(this.image).subscribe(
      (data) => {
        this.supplier.image=data
        console.log(data);
        this.uploadingFile=false;
  
      },
      (err) => {
        console.log(err);
        this.uploadingFile=false;
      }
    );
  }
}
    }
    

