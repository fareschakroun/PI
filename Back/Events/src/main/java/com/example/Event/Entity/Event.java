package com.example.Event.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
//---- the Cloudinary things ----
    private String imageUrl;
    private String imageIdCloudinary;
    private int imageId;
    // -------------------------
    private EventType type;
    @Column( unique = true)
    private String name;
    // event will be at
    private Date date;
    // the event created in database
    private Date created_at;
    // reference USER
    private int created_by;
    private String note;
    // a numberd
    private int viewsCounter;
    // a number
    private int interestedCounter;
    // active is before and during the event date ------ will check it
    private String active;


    //  a rating table to calculate it
    private double rating;
    // cant remove this , it is a checkbox that the event creator MUST select or NOT

    private Date lastModified_at;
    private int lastModified_by;




    /// One to Many    UNIDIRECTIONNEL -----> i dont have accss to the USERs
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Interested> interesteds;

    /// One to Many    UNIDIRECTIONNEL   -- ----  association Galery
    // les personne qui peut voir les stats du event/admin
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> images;

    /// One to Many    UNIDIRECTIONNEL
    // la liste des commentaire / ratings
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Rating> ratings;

    /// One to Many    UNIDIRECTIONNEL
    // la liste des commentaire / ratings
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Presence> presences;


}
