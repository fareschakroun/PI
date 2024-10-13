package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.ChatMessage;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.dto.ChatMessageDTO;
import com.example.exhibitor.dto.UserCredential;
import org.apache.catalina.User;

import java.util.List;

public interface MessageService {

    public ChatMessageDTO addMessage(ChatMessage chatMessage, Long senderId, Long receiverId) throws Exception;

    public void sendMessage(String chatMessage,String Mapping);

    public void saveMessage(String chatMessage, UserCredential sender, UserCredential receiver,Long isButton);

    public List<ChatMessage> allMessages();

    public List<ChatMessage> getChatMessagesBySenderAndReceiver(Long receiverId,Long senderId);

    public ChatMessage getLastChatMessage(Long senderId,Long receiverId);

}
