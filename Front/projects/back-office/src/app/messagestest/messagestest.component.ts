import { Component, OnDestroy, OnInit } from '@angular/core';

import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/websocketservice';
// import { ChatService } from '../services/websocketservice';

@Component({
  selector: 'app-messagestest',
  templateUrl: './messagestest.component.html',
  styleUrls: ['./messagestest.component.scss']
})
export class MessagestestComponent implements OnInit{

  constructor(private websocketService:WebSocketService){}

  currentMeeting: any ;
  ngOnInit(): void {
   this.websocketService.connect();

   document.querySelector('.chat[data-chat=person2]')!.classList.add('active-chat');
   document.querySelector('.person[data-chat=person2]')!.classList.add('active');
   
   interface Friends {
     list: HTMLUListElement;
     all: NodeListOf<HTMLDivElement>;
     name: string;
   }
   
   interface Chat {
     container: HTMLElement;
     current: HTMLElement | null;
     person: string | null;
     name: HTMLElement;
   }
   
   let friends: Friends = {
     list: document.querySelector('ul.people') as HTMLUListElement,
     all: document.querySelectorAll('.left .person'),
     name: ''
   };
   
   let chat: Chat = {
     container: document.querySelector('.container .right') as HTMLElement,
     current: null,
     person: null,
     name: document.querySelector('.container .right .top .name') as HTMLElement
   };
   
   friends.all.forEach(f => {
     f.addEventListener('mousedown', () => {
       if (!f.classList.contains('active')) setActiveChat(f);
     });
   });
   
   function setActiveChat(f: HTMLDivElement) {
     (friends.list.querySelector('.active') as HTMLLIElement).classList.remove('active');
     f.classList.add('active');
     chat.current = chat.container.querySelector('.active-chat') as HTMLElement;
     chat.person = f.getAttribute('data-chat');
     chat.current!.classList.remove('active-chat');
     (chat.container.querySelector(`[data-chat="${chat.person}"]`) as HTMLElement).classList.add('active-chat');
     friends.name = (f.querySelector('.name') as HTMLElement).innerText;
     chat.name.innerHTML = friends.name;
   }
   
  }
sendToback(){

  this.websocketService.sendName("hamma");
}

unsub(){
 // this.websocketService.unsubscribeToWebSocketEvent("socket/meetingStarts");
}

  
}
