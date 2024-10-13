package com.example.Event.Controller;


import com.example.Event.Entity.Event;
import com.example.Event.Entity.Rating;
import com.example.Event.Service.EventService;
import com.example.Event.Service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Event/Rating")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class RatingController {
    private final RatingService service ;
    private final EventService eventService;
    @PostMapping("/addRating")
    @ResponseStatus(HttpStatus.CREATED)
    public Event addRating(@RequestBody Rating rating )
    {
        service.save(rating);
        return eventService.findbyId(rating.getEventID());
    }
    @PutMapping("/updateRating")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateRating(@RequestBody Rating rating )
    {
        service.updateRating(rating);
        service.updateRatingForEvent(rating.getEventID());

    }
    @GetMapping("/AllRating")
    public ResponseEntity<List<Rating>> findAllRatings(){
        return ResponseEntity.ok(service.findAllRatings());
    }
    @GetMapping("/UserRating/{user}")
    public ResponseEntity<List<Rating>> findUserRatings(@PathVariable("user") int user){
        return ResponseEntity.ok(service.findUserRatings(user));
    }

    @GetMapping("/EventRating/{event}")
    public ResponseEntity<List<Rating>> findEventRatings(@PathVariable("event") int event){
        return ResponseEntity.ok(service.findEventRatings(event));
    }
    @DeleteMapping("/removeRating/rating")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@RequestBody Rating rating)
    {
        service.remove(rating);
        service.updateRatingForEvent(rating.getEventID());

    }
    @DeleteMapping("/removeInterest/{event}/{user}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("user") int event,@PathVariable("user") int userId )
    {
        service.remove(event,userId);

    }
}
