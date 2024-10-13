package com.example.Event.Service;

import com.example.Event.Entity.Comment;
import com.example.Event.Entity.Comments;
import com.example.Event.Entity.Dislike;

import java.util.List;

public interface CommentService {

     void save(Comment comment);
     Comment saveReply(Comment comment);
    public List<Comment> findUserComments(int user);
    public List<Comment> findEventComments(int event);
    public List<Comment> findAllComments();
    public Comment addLike(Dislike dislike);
    public Comment removeLike(Dislike dislike);
    public void removeLike(int likeId);
    public void updateComment(Comment comment);
    public List<Comments> getMyFullList(int event);
}
