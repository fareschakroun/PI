package com.example.exhibitor.Entity;

import com.example.exhibitor.dto.UserCredential;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String content ;


    private Integer senderFK ;

    private Integer receiverFK ;

    private LocalDateTime createdAt ;

    private Long isButton ;





}
