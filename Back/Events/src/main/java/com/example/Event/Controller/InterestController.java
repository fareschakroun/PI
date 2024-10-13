package com.example.Event.Controller;


import com.example.Event.Entity.Event;
import com.example.Event.Entity.Interested;
import com.example.Event.Service.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Event/Interest")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class InterestController {
    private final InterestService service;

    @GetMapping("/addInterest/{user}/{event}")
    @ResponseStatus(HttpStatus.CREATED)
    public Interested addInterest(@PathVariable("user") int user, @PathVariable("event") int event) {
        return service.save(event, user);
    }

    @GetMapping("/AllInterest")
    public ResponseEntity<List<Interested>> findAllInterests() {
        return ResponseEntity.ok(service.findAllInterests());
    }

    @GetMapping("/UserInterest/{user}")
    public ResponseEntity<List<Interested>> findUserIntereset(@PathVariable("user") int user) {
        return ResponseEntity.ok(service.findByUserID(user));
    }


    @DeleteMapping("/removeInterest/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Event remove(@PathVariable("id") int id) {
        return service.remove(id);
    }

    @DeleteMapping("/removeInterestByUserByEvent/{id}/{event}")
    @ResponseStatus(HttpStatus.OK)
    public Event remove(@PathVariable("id") int id, @PathVariable("event") int event) {
        return service.removeByUserByEvent(id, event);
    }
}
