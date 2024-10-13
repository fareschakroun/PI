package com.example.claim.Controller;


import com.example.claim.Entity.Claim;
import com.example.claim.Entity.ClaimType;
import com.example.claim.Service.ClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/Claims")
@RequiredArgsConstructor
//@CrossOrigin(origins = { "*" })
public class Controller {

    private final ClaimService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(
            @RequestParam(value ="file",required = false) MultipartFile file,
            @RequestBody Claim claim
    )
    {
        service.addClaim(claim, file);
    }

    @GetMapping
    public ResponseEntity<List<Claim>> findAllClaims(){
        return ResponseEntity.ok(service.findAllClaims());
    }

    @PutMapping
    public Claim updateClaim(@RequestBody Claim claim){
        return  service.modifyClaim( claim);
    }

    @DeleteMapping("/remove-claim/{claim-id}")
    public void removeClaim(@PathVariable("claim-id") Long claimId) {
        service.removeClaim(claimId);
    }

    @GetMapping("/retrieve-claim/{claim-id}")
    public Claim retrieveClaim(@PathVariable("claim-id") Long claimId) {
        return service.retrieveClaim(claimId);
    }

    @GetMapping("/findClaim/{id}")
    public Claim FindClaim(@PathVariable("id") Long id){
        return service.FindClaim(id);

    }

    @GetMapping("/find/{subject}")
    public List<Claim> FindBySubject(@PathVariable("subject") ClaimType subject){
        return service.FindBySubject(subject);
    }

    @GetMapping("/find2/{status}")
    public List<Claim> FindByStatus(@PathVariable("status") String status){
        return service.FindByStatus(status);
    }

    @GetMapping("/levelAsc/{status}")
    public List<Claim> GetClaimsByLevelorder(@PathVariable("status") String status) {
        return service.GetClaimsByLevelorder(status);

    }

    @GetMapping("/levelDesc/{status}")
    public List<Claim> GetClaimsByLevelorder2(@PathVariable("status") String status) {
        return service.GetClaimsByLevelorder2( status);
    }

    @PutMapping("/decision/{claimId}")
    public ResponseEntity<?> modifyDecisionAndStatus(@PathVariable long claimId) {
        service.updateClaimDecision(claimId);
        return ResponseEntity.ok().body("Your decision has been updated and the status has been set");

    }
}
