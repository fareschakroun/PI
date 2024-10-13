package com.example.exhibitor.Controller;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.client.UserClient;
import com.example.exhibitor.dto.UserCredential;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.Path;
import org.springframework.stereotype.Controller;
import com.example.exhibitor.Entity.ChatMessage;
import com.example.exhibitor.Entity.Exhibitor;
import com.example.exhibitor.Repository.ChatRoomRepository;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.Service.ChatRoomService;
import com.example.exhibitor.Service.MessageService;
import com.example.exhibitor.dto.ChatMessageDTO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController



@AllArgsConstructor
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {


    private ChatRoomService chatRoomService ;

    @Autowired
    UserClient userClient ;

    @Autowired
    private SupplierRepository supplierRepository ;


    @Autowired
    private MessageService messageService ;








    @PostMapping("/addChatRoom/{userId}/{user2Id}")
    @ResponseStatus(HttpStatus.CREATED)
    public com.example.exhibitor.entity.ChatRoom addchatroom(
            @RequestBody com.example.exhibitor.entity.ChatRoom chatRoom,

            @PathVariable("userId") Long user1Id , @PathVariable("user2Id") Long user2Id

    )
    {
        //return  chatRoomService.addChatRoom(chatRoom,user1Id,user2Id);
        return null ;
    }
    @PostMapping("/addChatMessage/{senderId}/{receiverId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ChatMessageDTO addChatMessage(
            @RequestBody ChatMessage chatMessage,
            @PathVariable("senderId") Long senderId,
            @PathVariable("receiverId") Long receiverId


    ) throws Exception {
        return  messageService.addMessage(chatMessage,senderId,receiverId);
    }
    @MessageMapping("/chat/sendMessage/{senderID}/{receiverID}/{isButton}")
    @SendTo("/topic/public")
    public void sendMessage(
            @Payload String chatMessage,
            @DestinationVariable Long senderID ,
            @DestinationVariable Long receiverID,
            @DestinationVariable Long isButton

    ) throws JsonProcessingException {

        log.info("payload : {}",chatMessage);


        ChatMessageDTO messageDTO = new ChatMessageDTO();

        UserCredential sender = userClient.getUser(senderID.intValue());//the sender is the admin
        UserCredential receiver = userClient.getUser(receiverID.intValue());

            if(isButton == 1){
                messageService.saveMessage(chatMessage,sender,receiver,1l);
            }else {
                messageService.saveMessage(chatMessage,sender,receiver,0l);
            }

        messageDTO.setContent(chatMessage);
         messageDTO.setSender(sender);
        messageDTO.setReceiver(receiver);
        messageDTO.setIsButton(isButton);

        ObjectMapper objectMapper = new ObjectMapper();
        String MessageDTOJSON = objectMapper.writeValueAsString(messageDTO);

        messageService.sendMessage(MessageDTOJSON,"/topic/public");



    }


   /* @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }*/

    @GetMapping("/allChatMessages")
    public List<ChatMessage> getAllmessages(){
        return messageService.allMessages();
    }
    @GetMapping("/getChatMessagesBySenderAndReceiver/{sender}/{receiver}")
    public List<ChatMessage> getAllRoomMessages(
            @PathVariable("sender") Long senderID,
            @PathVariable ("receiver") Long receiverId

    ){
        return messageService.getChatMessagesBySenderAndReceiver(senderID,receiverId);
    }
    @GetMapping("/getLastMessage/{sender}/{receiver}")
    public ChatMessage getLastMessage(
            @PathVariable("sender") Long senderID,
            @PathVariable ("receiver") Long receiverId

    ){
        return messageService.getLastChatMessage(senderID,receiverId);
    }
}