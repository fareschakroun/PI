import { Component, OnInit } from '@angular/core';

import { ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len:number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-online-meeting',
  templateUrl: './online-meeting.component.html',
  styleUrls: ['./online-meeting.component.css']
})
export class OnlineMeetingComponent   implements OnInit{
  roomID!: string
  constructor(private activatedRoute: ActivatedRoute ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomID = params['idroom'];
      
    });
  }
       


  
  @ViewChild('root')
  root!: ElementRef;


/* 
  const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
  const userID = Math.floor(Math.random() * 10000) + "";
  const userName = "userName" + userID;
  const appID = 1213421494;
  const serverSecret = "9b6392dec060ea0cd4642a72a0c70e5a";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);


 */

  ngAfterViewInit() {
    //  const roomID = getUrlParams().get('idroom') || randomID(5);

     // generate Kit Token
      const appID = 1787633511;
      const serverSecret = "be7d01f6b8f4d9066443d71c7b6d235c";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomID,  randomID(5),  randomID(5));

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start a call.
      zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
              '?roomID=' +
              this.roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
  }

  
}
