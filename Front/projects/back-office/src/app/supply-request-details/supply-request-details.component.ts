import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../models/Supplier';
import { ServicebackService } from '../services/serviceback.service';
import { SupplyRequest } from '../models/SupplyRequest';
import { supplierUser } from '../models/SupplierUser';
import { SupplierOffer } from '../models/SupplierOffer';
import $ from 'jquery';
import { message } from '../models/Message';
import { WebSocketService } from '../services/websocketservice';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '../models/User';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-supply-request-details',
  templateUrl: './supply-request-details.component.html',
  styleUrls: ['./supply-request-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ])
  ]
})



export class SupplyRequestDetailsComponent implements OnInit {
 


SuggestedPrice : number = 0 ;
  AllChatMessages:message[]=[];
  ReceiverId : number ;
  messages: message[] = [];
  newMessage: string = '';
  showChat: boolean = false;
  messageForm: FormGroup;
  sender : User ;
UsersList : supplierUser[]=[
{ id: 1 ,nom:"dhafer",numeroTelephone : "5520278"},
{ id: 2 ,nom:"hamma",numeroTelephone : "7897845"},
{ id: 3 ,nom:"ahmed",numeroTelephone : "4564524"},
{ id: 4 ,nom:"salah",numeroTelephone : "1234567"}


] ;

  receiver:User ;
 
  sentMessage : message ={
    content:"",
    senderFK: 0,
    receiverFK:0,
    createdAt: "",
    isButton: 0 
  }
  messagecomingfromsocket: message = {

    content :"",
    senderFK:0,
    receiverFK: 0,
    createdAt: "",
    isButton: 0
   }
    
   get filteredUsersList() {
    return this.UsersList.filter(user =>
      user.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  searchTerm: string = '';
  toggleChat() {
    this.showChat = true ;
  }

  lastMessage:message
  getLastMessage(senderId: number, receiverId: number): string {
    if (!this.messages || this.messages.length === 0) {
      return "No messages available";
    }
    
    // Filter messages based on sender and receiver IDs
    const filteredMessages = this.messages.filter(message => 
      (message.senderFK === senderId && message.receiverFK === receiverId) ||
      (message.senderFK === receiverId && message.receiverFK === senderId)
    );

    if (filteredMessages.length === 0) {
      return "No messages with content available";
    }

    // Sort messages based on createdAt attribute
    const sortedMessages = filteredMessages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Return the last (latest) message content
    return sortedMessages[0].content;
}
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Assuming this.userID and this.ReceiverId are properly assigned
      var userIDString = localStorage.getItem("userID");
      this.userID = parseInt(userIDString, 10);
      console.log("current user id")
      console.log(this.userID);
      const testmessage = this.newMessage;
  
       
      this.serviceback.getUser(userIDString).subscribe((senderData: User) => {
        console.log("senderDATA")
        console.log(senderData);
        this.sender = senderData;
      
  
        
       // Assuming this.receiver is properly assigned
       this.serviceback.getUser(this.ReceiverId.toString()).subscribe((receiverData: User) => {
        this.receiver = receiverData;
       

        // Construct the message object here
        const willbesent = new message(testmessage, this.sender.id, this.receiver.id,0);
        
        // Assuming sendMessage is a method that sends the message
        this.chatSocket.sendMessage(willbesent);
     
       // this.messages.push(willbesent)
      });

       
      });


    

   /* this.chatSocket.stompClient.subscribe('/topic/public', (message :any) => {
      console.log('SENDER: ' + message.body);
      const messageObject = JSON.parse(message.body);
      const senderId = messageObject.sender.id;
  const senderName = messageObject.sender.nom;
  const senderPhoneNumber = messageObject.sender.numeroTelephone;

  const receiverId = messageObject.receiver.id;
  const receiverName = messageObject.receiver.nom;
  const receiverPhonenumber = messageObject.receiver.numeroTelephone;

  console.log('Sender ID:', senderId);
  console.log('Sender Name:', senderName);
  console.log('Sender Phone Number:', senderPhoneNumber);
  
  console.log('receiver ID:', receiverId);
  console.log('receiver Name:', receiverName);
  console.log('receiver Phone Number:', receiverPhonenumber);

  const containingmessage = messageObject.content
  this.messagecomingfromsocket = {content:containingmessage,sender:messageObject.sender,receiver:messageObject.receiver}
 
     // console.log(message.body.sender.id)
    });*/
    //this.messages.push(this.messagecomingfromsocket)
      // Code to send message to the backend or perform any other actions
      this.newMessage = '';
    }
  }
  loadConversation(senderId:number,receiverid:number){
   
    this.toggleChat();
    this.ReceiverId = receiverid; // loads the receiver id you're going to send a message to 

   
   //this.messages = [] // this has to be become a get request from DB
   var userIDString = localStorage.getItem("userID");
   this.userID = parseInt(userIDString, 10);
   this.serviceback.getAllMessages(this.userID,this.ReceiverId).subscribe((data:message[])=>{

    this.messages=data ;
    console.log(data);
   });
   //this.messages.push({ content: "third conversation", sender: this.sender ,receiver: this.thirdUser});
  // this.messages.push({ content: "second conversation", sender: this.sender ,receiver: this.secondUser});
  // this.messages = this.messages.filter((message) => message.sender.id === senderId && message.receiver.id === receiverid);
    console.log("MESSAGES")
    console.log(this.messages)
  }




  supplyRequest: SupplyRequest = {
    id:0,
    requirement:'String',
    quantity: 0 ,
    price: 0 ,
    boothPosition: 'String' ,
    productname: 'String' ,
    servicename: 'String' ,
    type : 'String' ,
    createdAt : 'String',
    
   
   image:null
}
Suppliers : supplierUser[]=[];
SupplyOffer : SupplierOffer[]=[];
userID: number ; 
updateSupplier(supplyRequestId:number){
  this.router.navigate(['/supplier',supplyRequestId]);
}
  constructor(private userservice:UserService ,private formBuilder: FormBuilder,private router:Router,private serviceback:ServicebackService ,private acr:ActivatedRoute,private renderer: Renderer2,private chatSocket:WebSocketService){}
  ngOnInit(): void {

    this.messageForm = this.formBuilder.group({
      SuggestedPrice: [null]
    });

    $( '.friend-drawer--onhover' ).on( 'click',  function() {
  
      $( '.chat-bubble' ).hide('slow').show('slow');
      
    });



    this.serviceback.getAllUserSuppliers().subscribe((data:supplierUser[])=>{
      /* data.forEach(element => {
        this.userservice.getUser(element.id.toString()).subscribe((data)=>{

          element.fullUser=data;
        });
      }); */
      this.UsersList = data ;
    })

  
   

      /////Socket 
      this.chatSocket.connectToChat();
      //message 
      this.chatSocket.getMessageSubject().subscribe(messageObject => {
    
        
         if ((messageObject.sender.id === this.userID && messageObject.receiver.id === this.ReceiverId) ||
        (messageObject.sender.id === this.ReceiverId && messageObject.receiver.id === this.userID)) {
        const containingmessage = messageObject.content;
        const parsedMessage = {
            content: containingmessage,
            senderFK: messageObject.sender.id,
            receiverFK: messageObject.receiver.id,
            createdAt: messageObject.createdAt,
            isButton: messageObject.isButton
        };
        this.messages.push(parsedMessage);
    }
      });
    









   
    this.serviceback.getsupplier().subscribe((data:Supplier[])=>{
      this.SupplyRequestList=data
    
  
  
  this.acr.params.subscribe((params)=>{
    this.serviceback.getsupplierItemById(params['id']).subscribe((data)=>{
    //  console.log(params['id'])
    //  console.log(data)
     this.supplyRequest= data;
     this.serviceback.getSuppliersOffers(params['id']).subscribe((data:supplierUser[])=>{
      this.Suppliers=data ;
   //   console.log(data);
    })
    
    })
    this.serviceback.getAllOfferForSupplyRequest(params['id']).subscribe((data:SupplierOffer[])=>{
      this.SupplyOffer=data ;
      console.log("supplyoffer list ")
      console.log(this.SupplyOffer)
    //  console.log("SUPPLIER OFFER DATA :")
    //  console.log(data);
      
    })
  });
  })
  }
  SupplyRequestList : Supplier[]=[]

  setStatusAccepted(requestid:number) { 
    this.serviceback.setRequestStatus(requestid, 'Approved').subscribe((data: any[]) => {
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Request accepted successfully.',
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

 
     
   //  this.SupplyRequestList[this.SupplyRequestList.indexOf(requestid)].status = 'Approved'
    
  }
  setStatusRefused(requestid:number){
    this.serviceback.setRequestStatus(requestid,'NotApproved').subscribe((data:any[]) =>{
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Request refused successfully.',
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

   // this.serviceback.removeSupplierFromSupplyRequest(requestid).subscribe();
    //this.SupplyRequestList[this.SupplyRequestList.indexOf(requestid)].status = 'NotApproved'
  }
    );
   

  }

  handleButtonClick(){
    console.log("PRICE SUGGESTION BUTTON IS CLICKED")
  }
  sendSuggestionPrice() {

     
  this.acr.params.subscribe((params)=>{
    // Implement sending the message using socket or any other method
    const suggestedPrice = this.messageForm.value.SuggestedPrice;

    console.log('Price:', suggestedPrice);
    // Clear the form controls after sending the message


    
      // Assuming this.userID and this.ReceiverId are properly assigned
      var userIDString = localStorage.getItem("userID");
      this.userID = parseInt(userIDString, 10);
      console.log("current user id")
      console.log(this.userID);
      const testmessage = suggestedPrice + " \n Offer Id: " +
      params['id'];
       
      this.serviceback.getUser(userIDString).subscribe((senderData: User) => {
        console.log("senderDATA")
        console.log(senderData);
        this.sender = senderData;
      
  
        
       // Assuming this.receiver is properly assigned
       this.serviceback.getUser(this.ReceiverId.toString()).subscribe((receiverData: User) => {
        this.receiver = receiverData;
       

        // Construct the message object here
        const willbesent = new message(testmessage, this.sender.id, this.receiver.id,1);
        
        // Assuming sendMessage is a method that sends the message
        this.chatSocket.sendMessage(willbesent);
     
       // this.messages.push(willbesent)
      });

       
      });
      this.newMessage = '';

    });
    
 
  }

}
