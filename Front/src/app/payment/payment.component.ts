import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

import { environment } from 'projects/back-office/src/app/models/stripe';

import { RoomServiceService } from 'projects/back-office/src/app/services/room-service.service';
import Swal from 'sweetalert2';
import { PackServiceService } from '../../../projects/back-office/src/app/services/pack-service.service';
import { Payment } from '../../../projects/back-office/src/app/models/Payment';
import { Room } from '../../../projects/back-office/src/app/models/room';
import { UserService } from '../services/user.service';
import { User } from 'projects/back-office/src/app/models/User';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private http: HttpClient,
    private activate: ActivatedRoute,
    private packService: PackServiceService,
    private route: Router,
    private userserv : UserService,
    private roomService: RoomServiceService
  ) {}
  payment: Payment = new Payment();
  points50: number = 0;
  points100: number = 0;
  points150: number = 0;
  totalAmount: number = 0;
  totalPoints: number = 0;
  room: Room = new Room();
  id = 0;
  calculateTotalAmount() {
    this.totalAmount =
      this.points50 * 30 + this.points100 * 50 + this.points150 * 100;
   // this.totalPoints = this.totalPoints+
      //this.points50 * 50 + this.points100 * 100 + this.points150 * 150;
  }
  incrementPoints(type: string) {
    if (type === '50') {
      this.points50++;
      this.totalPoints = this.totalPoints+
      50
    } else if (type === '100') {
      this.points100++;
      this.totalPoints = this.totalPoints+
      100
    } else if (type === '150') {
      this.totalPoints = this.totalPoints+
       150
      this.points150++;
    }
    this.calculateTotalAmount();
  }
  user : User;
  stripePromise = loadStripe(environment.stripe);
  ngOnInit(): void {
    this.userserv
    .getUserById(parseInt(localStorage.getItem('userID')))
    .subscribe((res) => {
      this.user = res;
      this.totalPoints= res.points;
    });
    throw new Error('Method not implemented.');
  }
  iduser: number = 0;

  async pay(): Promise<void> {
    this.id = this.activate.snapshot.params['id'];
    this.roomService.getRoomById(this.id).subscribe(
      (r) => {
        this.iduser = parseInt(localStorage.getItem('userID'));
        this.userservice
          .affecterRoomTouser(this.id, this.iduser, this.totalPoints-this.user.points)
          .subscribe((r) => {});
        this.room = r;
      },
      (error) => {
        console.error('Erreur lors de la récupération du room :', error);
      }
    );
    this.payment.amount === this.totalAmount;
    this.payment.quantity === this.totalPoints-this.user.points;

    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: this.totalAmount,
      quantity: this.totalPoints-this.user.points,
      // cancelUrl: 'http://localhost:4200/cancel',
      // successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http
      .post(`${environment.serverUrl}/payment/${this.id}/${this.user.id}`, payment)
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe!.redirectToCheckout({
          sessionId: data.id,
        });
      });
    /*  this.packService.sendcodeMail("eya.somai@esprit.tn",this.room.codeRoom).subscribe(
        () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "envoi code ",
            showConfirmButton: false,
            timer: 1500,
          });
         
        },
        (error) => {
          console.error("Erreur lors de l'ajout", error);
        }
      ); */
  }

  mail() {
    this.packService
      .sendcodeMail(this.user.email.toString(), this.room.codeRoom)
      .subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'envoi code ',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error("Erreur lors de l'ajout", error);
        }
      );
  }
}
