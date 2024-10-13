package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.ChatMessage;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Repository.ChatRoomRepository;
import com.example.exhibitor.Repository.MessageRepository;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.client.UserClient;
import com.example.exhibitor.dto.ChatMessageDTO;
import com.example.exhibitor.dto.UserCredential;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class MessageServiceImpl  implements MessageService{

    MessageRepository messageRepository;




    private final MessageSendingOperations<String> messagingTemplate;

    SupplierRepository supplierRepository ;


    @Override
    public ChatMessageDTO addMessage(ChatMessage chatMessage,Long senderId,Long receiverId) throws Exception {

      /*  ChatMessageDTO message = new ChatMessageDTO();

        Supplier sender = supplierRepository.findSupplierById(senderId);
        Supplier receiver = supplierRepository.findSupplierById(receiverId);

        messageRepository.save(chatMessage);

       message.setContent(chatMessage.getContent());
       message.setSender(sender);
       message.setReceiver(receiver);
         return message;*/
        return null ;
    }

    @Override
    public void sendMessage(String chatMessage,String Mapping) {
        //log.info(Mapping+"/"+senderId+"/"+receiverId);
        messagingTemplate.convertAndSend(Mapping,chatMessage);
    }

    @Override
    public void saveMessage(String chatMessage, UserCredential sender, UserCredential receiver,Long isButton) {
        ChatMessage chatMessage1 = new ChatMessage();
        chatMessage1.setContent(chatMessage);
        chatMessage1.setSenderFK(sender.getId());
        chatMessage1.setReceiverFK(receiver.getId());
        chatMessage1.setIsButton(isButton);
        chatMessage1.setCreatedAt(LocalDateTime.now());
        messageRepository.save(chatMessage1);
    }

    @Override
    public List<ChatMessage> allMessages() {
        return messageRepository.findAll();
    }

    @Override
    public List<ChatMessage> getChatMessagesBySenderAndReceiver( Long receiverId,Long senderId) {



        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(senderId,receiverId);
    }

    @Override
    public ChatMessage getLastChatMessage(Long senderId,Long receiverId) {
        return messageRepository.findLastMessageBySenderIdAndReceiverIdOrReceiverIdAndSenderId(senderId,receiverId).get(0);
    }
}
