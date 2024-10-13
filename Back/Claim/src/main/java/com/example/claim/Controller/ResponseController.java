package com.example.claim.Controller;

import com.example.claim.Entity.Claim;
import com.example.claim.Entity.Response;
import com.example.claim.Service.ClaimService;
import com.example.claim.Service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;


@RestController
@RequestMapping("/api/Responses")
@RequiredArgsConstructor
//@CrossOrigin(origins = { "*" })
public class ResponseController {
    private final ResponseService responseService;
    private final ClaimService claimService;

    @PostMapping("/{claimId}")
    public ResponseEntity<Response> submitResponse(@PathVariable("claimId") long claimId, @RequestBody Response response) {
        Claim claim = claimService.retrieveClaim(claimId);
        if (claim != null) {
            response.setCreatedAt(LocalDateTime.now());
            response.setClaim(claim); // Set the claim for the response
            Response savedResponse = responseService.saveResponse(response);
            claim.setResponse(savedResponse); // Set the response for the claim
            claimService.saveClaim(claim); // Save the updated claim
            return ResponseEntity.ok(savedResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{claimId}")
    public ResponseEntity<Response> getResponseByClaimId(@PathVariable("claimId") long claimId) {
        Optional<Response> response = responseService.getResponseByClaimId(claimId);
        return response.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
