package com.example.Event.Service;

import com.example.Event.Entity.Comment;
import com.example.Event.Entity.Comments;
import com.example.Event.Entity.Dislike;
import com.example.Event.Repository.CommentRepository;
import com.example.Event.Repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    private final LikeRepository likeRepository;

    @Override
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public Comment saveReply(Comment comment) {

        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> findUserComments(int user) {
        return commentRepository.findByUserID(user);
    }

    @Override
    public List<Comment> findEventComments(int event) {
        return commentRepository.findByEventID(event);
    }

    @Override
    public List<Comment> findAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment addLike(Dislike dislike) {
        System.out.println(dislike.getCommentID());
        Comment  comment =
                commentRepository.findById(dislike.getCommentID()).get();
        if(dislike.getId()!=0){
            Dislike like=likeRepository.findById(dislike.getId()).get();


                if (Objects.equals(like.getStatus(), "Like"))
                {
                    comment.setLikesCount(comment.getLikesCount()-1);
                }
                else if (Objects.equals(like.getStatus(), "Dislike")){
                    comment.setDislikesCount(comment.getDislikesCount()-1);
                }

        }
        if (Objects.equals(dislike.getStatus(), "Like"))
        {
            comment.setLikesCount(comment.getLikesCount()+1);
        }
        else if(Objects.equals(dislike.getStatus(), "Dislike")) {
            comment.setDislikesCount(comment.getDislikesCount() + 1);
        }
        if (dislike.getId()==0){
        likeRepository.save(dislike);
        Set<Dislike> mylikes=comment.getLikes();
        mylikes.add(dislike);
        comment.setLikes(mylikes);
        commentRepository.save(comment);

        }
        else {
            likeRepository.save(dislike);
        }
        return comment;
    }

    @Override
    public Comment removeLike(Dislike dislike) {

        Comment comment =
                commentRepository.findById(dislike.getCommentID()).get();
        if (dislike.getStatus()=="Like")
        {
            comment.setLikesCount(comment.getLikesCount()-1);
        }
        else{
            comment.setDislikesCount(comment.getDislikesCount()-1);
        }
        Set<Dislike> mylikes=comment.getLikes();
        mylikes.remove(dislike);
        comment.setLikes(mylikes);
        commentRepository.save(comment);
        likeRepository.delete(dislike);
        return
                comment;
    }

    @Override
    public void removeLike(int likeId) {
        Dislike dislike =likeRepository.findById(likeId).get();
        Comment comment =
                commentRepository.findById(dislike.getCommentID()).get();
        if (dislike.getStatus()=="Like")
        {
            comment.setLikesCount(comment.getLikesCount()-1);
        }
        else{
            comment.setDislikesCount(comment.getDislikesCount()-1);
        }
        Set<Dislike> mylikes=comment.getLikes();
        mylikes.remove(dislike);
        comment.setLikes(mylikes);
        commentRepository.save(comment);
        likeRepository.delete(dislike);
    }

    @Override
    public void updateComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public List<Comments> getMyFullList(int event) {
        return orderComments(findEventComments(event));
    }

    public List<Comments> orderComments(List<Comment> comments) {
        List<Comments> myComments = new ArrayList<>();
        int maxLevel = 0;

        // Find the maximum level of comments
        for (Comment comment : comments) {
            if (maxLevel < comment.getLevel()) {
                maxLevel = comment.getLevel();
            }
        }

        // Helper function to recursively process comments at each level
        processCommentsAtLevel(0, 0, comments, myComments);

        return myComments;
    }

    private void processCommentsAtLevel(int level, int parentThread, List<Comment> comments, List<Comments> parentComments) {
        List<Comments> commentsAtLevel = new ArrayList<>();

        for (Comment comment : comments) {
            if (comment.getLevel() == level && comment.getThread() == parentThread) {
                Comments subComments = new Comments();
                subComments.setLevel(level);
                subComments.setComment(comment);
                subComments.setList(new ArrayList<>());
                subComments.setReplying(false);
                parentComments.add(subComments);
                commentsAtLevel.add(subComments);
            }
        }

        for (Comments commentsLevel : commentsAtLevel) {
            processCommentsAtLevel(level + 1, commentsLevel.getComment().getThread(), comments, commentsLevel.getList());
        }
    }
}
