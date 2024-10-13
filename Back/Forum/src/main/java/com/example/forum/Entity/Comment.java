package com.example.forum.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private long idComment ;
    private int likesCount;
    private int dislikesCount;
    private boolean mostPertinentComment;
    private String textComment;
    @Temporal(TemporalType.DATE)
    private Date dateCreationComment;
    private int userId;


    @JsonIgnore
    @ManyToOne
    Post post;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Dislike> likes;
}
