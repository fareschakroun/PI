package com.example.Event.Repository;

import com.example.Event.Entity.Comment;
import com.example.Event.Entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {

    List<Comment> findByUserID(int user);
    List<Comment> findCommentByEventIDAndUserID(int event,int user);


    List<Comment> findByEventID(int event);

}
