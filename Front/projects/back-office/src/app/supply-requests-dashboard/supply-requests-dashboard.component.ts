import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { ServicebackService } from '../services/serviceback.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
//import { Message } from '@stomp/stompjs';


@Component({
  selector: 'app-supply-requests-dashboard',
  templateUrl: './supply-requests-dashboard.component.html',
  styleUrls: ['./supply-requests-dashboard.component.css']
})
export class SupplyRequestsDashboardComponent implements OnInit{

  messages: string[] = [];
message : string = '';
  getType(type: String){
    if (type === 'isProduct')
    {
      return 'Product'
    }else if (type ==='isService'){  
      return 'Service'
    }else if (type === 'isProductAndService'){ return ('Product and Service')}
    else{ return type }
   
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

  SupplyRequestList: Supplier[] =[];
  constructor(private supplierService: ServicebackService,private router:Router,private sanitizer: DomSanitizer){

  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
  ngOnInit(): void {
   
   


    this.supplierService.getsupplier().subscribe((data:Supplier[])=>{
      this.SupplyRequestList= data
      console.log("SUPPLY REQUESTS LIST")
      console.log(this.SupplyRequestList);
  })

 

  }
  deleteSupplier(supplier:Supplier){
    this.supplierService.deletesupplier(supplier.id).subscribe((data)=>
    {
      Swal.fire('Selected', `Deleted: ${supplier.productname?supplier.productname:supplier.servicename}  with Sucess `, 'success');
      setTimeout(()=> 
      {
        location.reload();
      },1000)
    })
  }
  showdetailofsupplierrequest(supplier:Supplier){
    this.router.navigate(['/supplyRequestDetails',supplier.id]);
  }
  updateSupplier(suplier:Supplier){
    this.router.navigate(['/supplier',suplier.id]);
  }

}
