import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RoomServiceService } from '../services/room-service.service';
import { Payment } from '../models/Payment';
import { PackServiceService } from '../services/pack-service.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/User';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  users:User[]=[];

  constructor(private userService:UserService, private packService: PackServiceService, private route: Router,private roomService: RoomServiceService) {}
  ngOnInit(): void {
    this.packService.getPayments().subscribe(res => {
      console.log(res)
      res.forEach((k:any) => {
        this.userService.getUserById(k.companyId).subscribe((ele)=>{

          this.users.push(ele);
        })
      });
     console.log(this.users)
      this.payments = res;
    });
  }

}
