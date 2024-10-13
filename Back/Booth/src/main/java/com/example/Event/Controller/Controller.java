package com.example.Event.Controller;


import com.example.Event.Entity.Booth;
import com.example.Event.Service.BoothService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Booths")
@RequiredArgsConstructor
public class Controller {
    private final BoothService service ;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(
            @RequestBody Booth booth
    )
    {
         service.saveBooth(booth);
    }
    @GetMapping
    public ResponseEntity<List<Booth>> findAllBooths(){
        return ResponseEntity.ok(service.findAllBooths());
    }

    @GetMapping("/boothsByexhb/{exhibitorid}")
    public ResponseEntity<List<Booth>> findAllBooths(@PathVariable("exhibitorid") Long exhibitorid){
        return ResponseEntity.ok(service.findAllBoothsByExhibitorId(exhibitorid));
    }
}
