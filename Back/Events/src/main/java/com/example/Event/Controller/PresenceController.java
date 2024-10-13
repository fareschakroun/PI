package com.example.Event.Controller;


import com.example.Event.Entity.Event;
import com.example.Event.Entity.Interested;
import com.example.Event.Entity.Presence;
import com.example.Event.Service.InterestService;
import com.example.Event.Service.PresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/Event/Presence")
@RequiredArgsConstructor

public class PresenceController {
    private final PresenceService service ;

    @PostMapping("/addPresense/{event}")
    @ResponseStatus(HttpStatus.CREATED)
    public Presence addPresense(@RequestBody Presence presence,@PathVariable("event") int event)
    {
      return  service.addPressence(presence,event);
    }
}
