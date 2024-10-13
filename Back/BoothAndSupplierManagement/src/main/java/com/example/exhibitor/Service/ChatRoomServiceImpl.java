package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Repository.ChatRoomRepository;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.entity.ChatRoom;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService{


    /*ChatRoomRepository chatRoomRepository ;

    SupplierRepository supplierRepository;

    @Override
    public ChatRoom addChatRoom(ChatRoom chatRoom, Long user1Id, Long user2Id) {
        Supplier supp1 = supplierRepository.findSupplierById(user1Id);
        Supplier supp2 = supplierRepository.findSupplierById(user2Id);
        chatRoom.setUser1(supp1);
        chatRoom.setUser2(supp2);
        if(supp1.getChatRoomsasuser1() != null && supp2.getChatRoomsasuser2() != null)
        {
            List<ChatRoom> chatrooms = new ArrayList<>();
            chatrooms.add(chatRoom);
            supp1.setChatRoomsasuser1(chatrooms);
            supp2.setChatRoomsasuser2(chatrooms);
            supplierRepository.save(supp1);
            supplierRepository.save(supp2);
            return chatRoomRepository.save(chatRoom);
        }else {
            supp1.getChatRoomsasuser1().add(chatRoom);
            supp1.getChatRoomsasuser2().add(chatRoom);
            supplierRepository.save(supp1);
            supplierRepository.save(supp2);
            return chatRoomRepository.save(chatRoom);
        }

    }

    @Override
    public ChatRoom getChatRoomByUsers(Long User1, Long User2) {
        Supplier user1 = supplierRepository.findSupplierById(User1);
        Supplier user2 = supplierRepository.findSupplierById(User2);
       return chatRoomRepository.findChatRoomByUser1AndUser2(user1,user2);
    }
*/

}
