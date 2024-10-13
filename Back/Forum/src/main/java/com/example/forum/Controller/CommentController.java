package com.example.forum.Controller;

import com.example.forum.Entity.Comment;
import com.example.forum.Entity.Dislike;
import com.example.forum.Entity.Post;
import com.example.forum.Service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Comments")
@RequiredArgsConstructor
//@CrossOrigin(origins ="*")
public class CommentController {
    private final CommentService service;


    @PostMapping("/add-comment/{id}")
    public Comment addComment(@RequestBody Comment comment,@PathVariable("id") long  id) {
       return  service.addComment(comment,id);
    }

    @GetMapping("retrieve-all-comments")
    public ResponseEntity<List<Comment>> findAllComments(){
        return ResponseEntity.ok(service.findAllComments());
    }

    @PutMapping("/update-comment/{id}")
    public Comment updateComment(@RequestBody Comment comment,@PathVariable("id") long id){
        return  service.modifyComment( comment,id);
    }

    @DeleteMapping("/remove-comment/{comment-id}")
    public void removeComment(@PathVariable("comment-id") Long commentId) {
        service.removeComment(commentId);
    }

    @GetMapping("/retrieve-comment/{comment-id}")
    public Comment retrieveComment(@PathVariable("comment-id") Long commentId) {
        return service.retrieveComment(commentId);
    }

    @PostMapping("/addLike")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment addLike(@RequestBody Dislike dislike)
    {
        return   service.addLike(dislike);
    }
    @DeleteMapping("/removeLike" )
    @ResponseStatus(HttpStatus.CREATED)
    public Comment removeLike(@RequestBody Dislike dislike)
    {
        return service.removeLike(dislike);
    }
}
