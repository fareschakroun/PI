package com.example.exhibitor.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.aspectj.weaver.ast.Not;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder

public class Supplier {
    @Id
    private long id ;

    private String nom ;

    private String numeroTelephone;
    @JsonIgnore
    @OneToMany(mappedBy = "supplier",cascade = CascadeType.ALL)
    List<SupplierRequest> supplierRequests = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "supplier",cascade = CascadeType.ALL)
    List<Booth> booths ;
    @OneToOne
    Image image ;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "supplier")
    List<Notifications> notifications ;

    public Long userID ;
   /* @JsonIgnore
    @OneToMany(mappedBy = "user1")
    List<com.example.exhibitor.entity.ChatRoom> chatRoomsasuser1 ;
    @JsonIgnore
    @OneToMany(mappedBy = "user2")
    List<com.example.exhibitor.entity.ChatRoom> chatRoomsasuser2 ;*/





}
