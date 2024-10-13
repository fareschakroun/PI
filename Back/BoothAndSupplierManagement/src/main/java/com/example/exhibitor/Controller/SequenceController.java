package com.example.exhibitor.Controller;

import com.example.exhibitor.Entity.BoothSequence;
import com.example.exhibitor.Service.BoothSequenceService;
import jakarta.ws.rs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/sequence")

public class SequenceController {

    @Autowired
    BoothSequenceService boothSequenceService;

    @GetMapping("/getSequence/{boothName}")
    public Long getSequenceforBooth(@PathVariable("boothName") String boothName){
        return this.boothSequenceService.getSequence(boothName);
    }
    @PostMapping("/addBoothSequence")
    public BoothSequence addBoothSequence(@RequestBody BoothSequence boothSequence){
        return this.boothSequenceService.AddBoothSequence(boothSequence);
    }
    @PostMapping("/IncrementBoothSequence/{boothName}")
    public void IncrementSequence(@PathVariable("boothName") String boothName){
        this.boothSequenceService.incrementSequence(boothName);
    }
}
