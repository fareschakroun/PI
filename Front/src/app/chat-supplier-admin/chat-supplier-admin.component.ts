import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplyRequest } from 'projects/back-office/src/app/models/SupplyRequest';
import { ServicebackService } from 'projects/back-office/src/app/services/serviceback.service';

import { message } from '../models/Message';
import { Supplier } from '../models/Supplier';
import { SupplierOffer } from '../models/SupplierOffer';
import { supplierUser } from '../models/SupplierUser';
import { User } from '../models/user';
import { WebSocketService } from '../services/websocketservice';
import { ServicefrontService } from '../services/servicefront.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-supplier-admin',
  templateUrl: './chat-supplier-admin.component.html',
  styleUrls: ['./chat-supplier-admin.component.scss']
})
export class ChatSupplierAdminComponent {

  AllChatMessages:message[]=[];
  ReceiverId : number ;
  messages: message[] = [];
  newMessage: string = '';
  showChat: boolean = false;

  sender : User ;
UsersList : User[]=[


] ;

  receiver:User ;
 
  sentMessage : message ={
    content:"",
    senderFK: 0,
    receiverFK:0,
    createdAt: "",
    isButton : 0
  }
  messagecomingfromsocket: message = {

    content :"",
    senderFK:0,
    receiverFK: 0,
    createdAt: "",
     isButton : 0
   }
    
   get filteredUsersList() {
    return this.UsersList.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
        console.log("receiver data")
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

  addChatTemplate(supplierid:number) {
   // Create the chat template element
   const chatTemplate = this.renderer.createElement('div');
   this.renderer.addClass(chatTemplate, 'friend-drawer');
   this.renderer.addClass(chatTemplate, 'friend-drawer--onhover');

   // Create the img element
   const imgElement = this.renderer.createElement('img');
   this.renderer.addClass(imgElement, 'profile-image');
   this.renderer.setAttribute(imgElement, 'src', 'https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg');
   this.renderer.setAttribute(imgElement, 'alt', '');

   // Append the img element to the chat template
   this.renderer.appendChild(chatTemplate, imgElement);

   // Create the div.text element
   const textElement = this.renderer.createElement('div');
   this.renderer.addClass(textElement, 'text');
   textElement.innerHTML = `
       <h6>Robo Cop</h6>
       <p class="text-muted">Hey, you're arrested!</p>
   `;

   // Append the text element to the chat template
   this.renderer.appendChild(chatTemplate, textElement);

   // Create the span.time element
   const timeElement = this.renderer.createElement('span');
   this.renderer.addClass(timeElement, 'time');
   this.renderer.addClass(timeElement, 'text-muted');
   this.renderer.addClass(timeElement, 'small');
   timeElement.textContent = '13:21';

   // Append the time element to the chat template
   this.renderer.appendChild(chatTemplate, timeElement);

   // Append the chat template to the chat container
   const chatContainer = document.getElementById('chat-container');
   this.renderer.appendChild(chatContainer, chatTemplate);
  }

  addUserToList(supplierId: number)
{


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
  constructor(private serviceback:ServicebackService ,private acr:ActivatedRoute,private renderer: Renderer2,private chatSocket:WebSocketService,private servicefront:ServicefrontService){}
  ngOnInit(): void {

/*     
    $( '.friend-drawer--onhover' ).on( 'click',  function() {
  
      $( '.chat-bubble' ).hide('slow').show('slow');
      
    }); */

  //  this.serviceback.AllMessages().subscribe((data:message[])=>{
    //  this.AllChatMessages=data

  //  })
  

    this.serviceback.getAdmins().subscribe((data:User[])=>{
      this.UsersList = data ;
    })

  
   

      /////Socket 
      this.chatSocket.connectToChat();
      //message 
      this.chatSocket.getMessageSubjectD().subscribe(messageObject => {
       
        console.log(messageObject)
        
        
        const containingmessage = messageObject.content;
        const parsedMessage = {
            content: containingmessage,
            receiverFK: messageObject.receiver.id,
            senderFK: messageObject.sender.id,
            
            createdAt: messageObject.createdAt,
            isButton :messageObject.isButton 
        };
        
        this.messages.push(parsedMessage);
        console.log("MESSAGES")
        console.log(parsedMessage)
    
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
     location.reload()
     
   //  this.SupplyRequestList[this.SupplyRequestList.indexOf(requestid)].status = 'Approved'
    });
  }
  setStatusRefused(requestid:number){
    this.serviceback.setRequestStatus(requestid,'NotApproved').subscribe((data:any[]) =>{
    console.log(data)
    this.serviceback.removeSupplierFromSupplyRequest(requestid).subscribe();
    //this.SupplyRequestList[this.SupplyRequestList.indexOf(requestid)].status = 'NotApproved'
  }
    );
   

  }
  handleButtonClick(message:string){
    // Find the index of the start of the price and offer ID
const priceIndex = message.indexOf("PRICE:") + "PRICE:".length;


// Extract the price and offer ID from the message using substr or substring
const price = message.substring(priceIndex, message.indexOf("OFFER ID:")).trim();

const offerIndex = message.indexOf("OFFER ID:") + "OFFER ID:".length;


// Extract the price and offer ID from the message using substr or substring
const offerId = message.substring(offerIndex+7).trim();

console.log("Price:", price); // Output: Price: 789798
console.log("Offer ID:", offerId); // Output: Offer ID: 5
 Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'RequestOffer Price changed successfully.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
this.servicefront.AcceptAdminSuggestion(parseInt(offerId),parseInt(price)).subscribe((data:SupplierOffer)=>{

  console.log(data);
})

  }
   extractOfferId(str:string):number {
    const regex = /OFFER ID: (\d+)/;
    const match = str.match(regex);
    if (match && match[1]) {
        return parseInt(match[1]);
    } else {
        return null;
    }
}
}
