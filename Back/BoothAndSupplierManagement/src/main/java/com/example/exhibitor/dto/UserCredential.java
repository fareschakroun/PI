package com.example.exhibitor.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserCredential {


    private int id;
    private String name;
    private String password;
    private String email ;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    //private LocalDate creationDate;

    private role role;

    private byte[] cv;
}