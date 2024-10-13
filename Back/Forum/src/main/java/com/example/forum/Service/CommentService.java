package com.example.forum.Service;

import com.example.forum.Entity.Comment;
import com.example.forum.Entity.Dislike;

import java.util.List;

public interface CommentService {

    public Comment addComment(Comment comment , long id);
     List<Comment> findAllComments();
     Comment retrieveComment(Long commentId);
     void removeComment(Long commentId);
     Comment modifyComment(Comment comment, long id);
     Comment addLike(Dislike dislike);
     Comment removeLike(Dislike dislike);
//     Comment likeComment(long commentId);
//     int dislike(long id);

}
