package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.ChatMessage;
import com.example.exhibitor.Entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<ChatMessage,Long> {

    @Query("SELECT m FROM ChatMessage m WHERE (m.senderFK = ?1 AND m.receiverFK = ?2) OR (m.senderFK = ?2 AND m.receiverFK = ?1)")
    List<ChatMessage> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(Long senderId, Long receiverId);

    @Query("SELECT m FROM ChatMessage m WHERE ((m.senderFK  = ?1 AND m.receiverFK = ?2) OR (m.senderFK = ?2 AND m.receiverFK= ?1)) ORDER BY m.createdAt DESC")
    List<ChatMessage> findLastMessageBySenderIdAndReceiverIdOrReceiverIdAndSenderId(Long senderId, Long receiverId);

}
