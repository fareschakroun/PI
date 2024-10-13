import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServicebackService } from '../services/serviceback.service';
import { SupplyRequest } from '../models/SupplyRequest';
import { Supplier } from '../models/Supplier';
@Component({
  selector: 'app-newsupplyrequestsdashboard',
  templateUrl: './newsupplyrequestsdashboard.component.html',
  styleUrls: ['./newsupplyrequestsdashboard.component.css'],
  
})
export class NewsupplyrequestsdashboardComponent implements OnInit{

  myFilter: any = { name: '' };
  SupplyRequestList : Supplier[]=[]
  ngOnInit(): void {

    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    this.serviceBack.getsupplier().subscribe((data:Supplier[])=>{
        this.SupplyRequestList=data

    });
  
  }
  setStatusAccepted(requestid:Supplier) { 
    this.serviceBack.setRequestStatus(requestid.id, 'Approved').subscribe((data: any[]) => {
     //location.reload()
     
     this.SupplyRequestList[this.SupplyRequestList.indexOf(requestid)].status = 'Approved'
    });
    

  }
  setStatusRefused(requestid:Supplier){
    this.serviceBack.setRequestStatus(requestid.id,'NotApproved').subscribe((data:any[]) =>{
    console.log(data)
    this.serviceBack.removeSupplierFromSupplyRequest(requestid.id).subscribe();
    this.SupplyRequestList[this.SupplyRequestList.indexOf(requestid)].status = 'NotApproved'
  }
    );
   

  }
  constructor(private serviceBack : ServicebackService){}
  
}


  