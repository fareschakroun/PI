package com.example.forum.Repository;

import com.example.forum.Entity.Post;
import com.example.forum.Entity.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    @Modifying
    @Query(value="UPDATE post p SET p.likesSubject=:nb WHERE p.idPost=:id",nativeQuery= true)
    int addLike(@Param("nb") int nb , @Param("id") long id);
    List<Post> findPostsByPostTags(Tag tag, Pageable pageable);

    @Query("SELECT p FROM Post p JOIN p.postTags t WHERE t IN :tags GROUP BY p ")
    List<Post> findPostsByTags(@Param("tags") List<Tag> tags);}
