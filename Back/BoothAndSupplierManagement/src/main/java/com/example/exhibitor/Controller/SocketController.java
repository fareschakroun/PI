package com.example.exhibitor.Controller;


import com.example.exhibitor.Entity.Notifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/socket")
public class SocketController {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;


    @GetMapping("/testSocket")
    public void testSocket(){
        messagingTemplate.convertAndSend("/topic/someDestination", "Hello from back");

    }
    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public String getNotification() {
return null ;
    }
    @MessageMapping("/notification")
    @SendTo("/socket/notification")
    public String someoneJoined(String test) {
      //  return notification;
        return "got it from back";
    }



}
