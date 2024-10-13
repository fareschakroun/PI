package com.example.authenticationservice.entity;


import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
//-------------------- not AN ENITITY ----------------------------
public class Image {

    private int Id ;
    private String name;
    private int userID;
    private int eventID;
    private String imageUrl;
    private String imageId;

    public Image(String name, String imageUrl, String imageId) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.imageId = imageId;
    }
}
