package com.example.exhibitor.dto;

import com.example.exhibitor.Entity.Supplier;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    private String Content ;
    private UserCredential sender ;
    private UserCredential receiver ;
    private Long isButton ;

}
