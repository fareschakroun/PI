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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id ;
    private int userID;
    private int eventID;
    private int likesCount;
    private int dislikesCount;
    // this comment exist under the commentID  thread
    // , if this comment is the Main then thead == NULL
    private int thread;
    // to track how deep the thread is
    private int level;
    private String comment;
    private String status;
    private Date datetime;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Dislike> likes;
}
