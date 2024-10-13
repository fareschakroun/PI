package com.example.Event.Controller;


import com.example.Event.Entity.Event;
import com.example.Event.Service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/Event/Events")
@RequiredArgsConstructor
public class EventController {
    private final EventService service ;

    @PostMapping("/addEvent")
    @ResponseStatus(HttpStatus.CREATED)
    public Event save(@RequestBody Event event )
    {
         return service.save(event);
    }
    @GetMapping("/Allevents")
    public ResponseEntity<List<Event>> findAllEvents(){
        return ResponseEntity.ok(service.findAllEvents());
    }

    // THIS FUNCTION DOES NOTHING AND IS DUPLICATED FROM ABOVE
    // paladin
    @GetMapping("/AlleventsNoGalery")
    public ResponseEntity<List<Event>> findAllEventsNoGalery(){
        return ResponseEntity.ok(service.findAllEvents());
    }

    @GetMapping("/fetchEventById/{id}")
    public ResponseEntity<Event> findEventById(@PathVariable("id") int id){

        return ResponseEntity.ok(service.findbyId(id));
    }
    @GetMapping("/fetchEventByName/{name}")
    public ResponseEntity<Event> findEventByName(@PathVariable("name") String name){
        return ResponseEntity.ok(service.findbyName(name));
    }

    @PutMapping("/{user}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody Event event,@PathVariable("user") int userId )
    {
        service.update(event,userId);
    }
    @GetMapping("/ClosestEvent")
    public ResponseEntity<List<Event>> closestEvent(){
        return ResponseEntity.ok(service.closestEvent());
    }

}
