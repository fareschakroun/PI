package com.example.forum.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPost ;
    private boolean featuredSubject;
    private String title;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;
    private String descriptionSubject;
    private int likesSubject;
    private int dislikesSubject;
    private int commentsCount;
    @Temporal(TemporalType.DATE)
    private Date dateCreationPost;
    private int numberOfComments;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String video;
    private int userId;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="post")
    private Set<Comment> comment;

    @ManyToMany
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> postTags = new ArrayList<>();

    public void setImage(String image) {
        this.image = image;
    }
}
