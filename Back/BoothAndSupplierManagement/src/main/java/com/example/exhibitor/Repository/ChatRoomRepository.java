package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository <com.example.exhibitor.entity.ChatRoom,Long > {

   // com.example.exhibitor.entity.ChatRoom findChatRoomByUser1AndUser2(Supplier user1, Supplier user2);
}
