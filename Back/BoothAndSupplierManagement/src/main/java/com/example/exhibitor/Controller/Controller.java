package com.example.exhibitor.Controller;


import com.example.exhibitor.Entity.Booth;
import com.example.exhibitor.Entity.Exhibitor;
import com.example.exhibitor.Entity.FullExhibitorResponse;
import com.example.exhibitor.Service.BoothService;
import com.example.exhibitor.Service.ExhibitorService;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/BoothAndSupplier")
@RequiredArgsConstructor

public class Controller {
    private final ExhibitorService service ;
    private final BoothService boothService ;

    @PostMapping("/addExhibitor")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(
            @RequestBody Exhibitor exhibitor
    )
    {
         service.saveBooth(exhibitor);
    }
    @GetMapping("/showallExhibitors")
    public ResponseEntity<List<Exhibitor>> findAllExhibitors(){
        return ResponseEntity.ok(service.findAllexhibitors());
    }
    @GetMapping("/{exhibitorId}")
    public ResponseEntity<FullExhibitorResponse> fullexhibitorResponse(@PathVariable("exhibitorId") Long exhibitor_id){
        return ResponseEntity.ok(service.fullExhibitorResponse(exhibitor_id));
    }
    @PostMapping("/addBooth")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(
            @RequestBody Booth booth
    )
    {
        boothService.saveBooth(booth);
    }
    @GetMapping("/showallBooths")
    public ResponseEntity<List<Booth>> findAllBooths(){
        return ResponseEntity.ok(boothService.findAllBooths());
    }

    @GetMapping("/boothsByexhb/{exhibitorid}")
    public ResponseEntity<List<Booth>> findAllBooths(@PathVariable("exhibitorid") Long exhibitorid){
        return ResponseEntity.ok(boothService.findAllBoothsByExhibitorId(exhibitorid));
    }
    @DeleteMapping("/deletebooth/{booth-id}")
    public void removeBooth(@PathVariable("booth-id") Long boothId) throws Exception {
         boothService.removeBooth(boothId);
    }
    @PutMapping("/affectBoothToSupplier/{BoothName}/{SupplierId}")

    public void affectBoothToSupplier(
            @PathVariable("BoothName") String boothName,@PathVariable("SupplierId") Long supplierID
    )
    {
       boothService.affectSupplierToBoothbyName(boothName,supplierID);
    }






}
