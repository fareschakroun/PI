import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { ServicefrontService } from '../services/servicefront.service';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { SupplierOffer } from '../models/SupplierOffer';
@Component({
  selector: 'app-newsupplierfront',
  templateUrl: './newsupplierfront.component.html',
  styleUrls: ['./newsupplierfront.component.css']
})
export class NewsupplierfrontComponent implements OnInit{
 
  supplierOffer: SupplierOffer = {
    description: "" ,
    price : 0,
    status :"Pending"
  }

  supplierOfferList :any[]=[];
  openDialog(itemId:number): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      data: {supplierOffer: this.supplierOffer},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.price)
      this.supplierOffer.description=result.description ;
      this.supplierOffer.price=result.price ;
  
      this.servicefront.addSupplierOffer(this.supplierOffer,this.userID,itemId).subscribe((data:any)=>{
        console.log("returned data after supplier suggestion :")
        console.log(data);
        location.reload()
      })
    });
  }

  userID:number ;
  SupplierList: Supplier[]= [];
requestSent:boolean = false ;
  getIfRequestSent( supplyRequestid : number): boolean{
    const matchingItems = this.supplierOfferList.filter((supplyrequest) => {
      const matchCondition = supplyrequest.supplier.id === this.userID && supplyrequest.supplierRequest.id === supplyRequestid;
      //console.log(`Checking item:`, supplyrequest, `Matched:`, matchCondition);
      return matchCondition;
  });

  const requestSent = !!matchingItems.length;
  //console.log(`Request sent for supplyRequestid ${supplyRequestid}:`, requestSent);
  return requestSent;
  }
  getIfRequestAccepted( supplyRequestid : number): boolean{
    const matchingItems = this.supplierOfferList.filter((supplyrequest) => {
      const matchCondition = supplyrequest.supplier.id === this.userID && supplyrequest.status === "Approved" && supplyrequest.supplierRequest.id===supplyRequestid;
      //console.log(`Checking item:`, supplyrequest, `Matched:`, matchCondition);
      return matchCondition;
  });
  

  const requestSent = !!matchingItems.length;
  //console.log(`Request sent for supplyRequestid ${supplyRequestid}:`, requestSent);
  return requestSent;
  }
  getIfRequestRefused( supplyRequestid : number): boolean{
    const matchingItems = this.supplierOfferList.filter((supplyrequest) => {
      const matchCondition = supplyrequest.supplier.id === this.userID && supplyrequest.status === "NotApproved" && supplyrequest.supplierRequest.id === supplyRequestid;
      //console.log(`Checking item:`, supplyrequest, `Matched:`, matchCondition);
      return matchCondition;
  });
  

  const requestSent = !!matchingItems.length;
  //console.log(`Request sent for supplyRequestid ${supplyRequestid}:`, requestSent);
  return requestSent;
  }
  ngOnInit(): void {

    var userIDString = localStorage.getItem("userID");
    this.userID = parseInt(userIDString, 10);

    this.servicefront.allSupplierOfferList().subscribe((data:any)=>{
      console.log(data);
      this.supplierOfferList=data ;
    })
    this.servicefront.getsupplier().subscribe((data:Supplier[])=>{
      this.SupplierList = data 
      console.log(data)
    });
   
  }

  UnsendRequest(supplyRequestid:number){
   
    var userIDString = localStorage.getItem("userID");
    this.userID = parseInt(userIDString, 10);


    this.servicefront.removeOffer(this.userID,supplyRequestid).subscribe(()=> {
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Request unsent successfully.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          location.reload();
        });
      }, 1000);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    });

  }

  
  constructor(private servicefront: ServicefrontService,public dialog: MatDialog){}

  

}
