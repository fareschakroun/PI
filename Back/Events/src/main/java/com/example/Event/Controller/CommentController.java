package com.example.Event.Controller;


import com.example.Event.Entity.Comment;
import com.example.Event.Entity.Comments;
import com.example.Event.Entity.Dislike;
import com.example.Event.Service.CommentService;
import com.example.Event.Service.EventService;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Event/Comment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class CommentController {
    private final CommentService service ;
    private final EventService eventService;
    @PostMapping("/addCommentFirst")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Comment> addCommentFirst(@RequestBody Comment comment )
    {
        service.save(comment);
        return service.findEventComments(comment.getEventID());
    }
    @PostMapping("/addComment")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment addComment(@RequestBody Comment comment )
    {
       return service.saveReply(comment);
    }
    @PostMapping("/addLike")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment addLike(@RequestBody Dislike dislike)
    {
      return   service.addLike(dislike);
        // service.findEventComments(dislike.getEventID());
    }
    @DeleteMapping("/removeLike" )
    @ResponseStatus(HttpStatus.CREATED)
    public Comment removeLike(@RequestBody Dislike dislike)
    {
       return service.removeLike(dislike);
       // return service.findEventComments(dislike.getEventID());
    }
    @PutMapping("/updateComment")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateComment(@RequestBody Comment comment )
    {
        service.updateComment(comment);
    }
    @GetMapping("/AllComment")
    public ResponseEntity<List<Comment>> findAllComments(){
        return ResponseEntity.ok(service.findAllComments());
    }
    @GetMapping("/UserComment/{user}")
    public ResponseEntity<List<Comment>> findUserComments(@PathVariable("user") int user){
        return ResponseEntity.ok(service.findUserComments(user));
    }

    @GetMapping("/EventComment/{event}")
    public ResponseEntity<List<Comment>> findEventComments(@PathVariable("event") int event){
        return ResponseEntity.ok(service.findEventComments(event));
    }

    @GetMapping("/orderedEvent/{event}")
    public ResponseEntity<List<Comments>> findOrderedComment(@PathVariable("event") int event){
        return ResponseEntity.ok(service.getMyFullList(event));

    }

}
