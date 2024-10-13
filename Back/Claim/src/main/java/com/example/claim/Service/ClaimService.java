package com.example.claim.Service;

import com.example.claim.Entity.Claim;
import com.example.claim.Entity.ClaimType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ClaimService {
    public Claim addClaim(Claim claim, MultipartFile file);
    public void saveClaim(Claim claim);
    public List<Claim> findAllClaims();
    public Claim retrieveClaim(Long claimId);
    public void removeClaim(Long claimId);
    public Claim modifyClaim(Claim claim);
    Claim FindClaim(Long id);
    public List<Claim> FindBySubject(ClaimType subject) ;
    public List<Claim> FindByStatus(String status) ;
    public Optional<Claim> FindByDate(String date) ;
    public List<Claim> GetClaimsByLevelorder(String status);
    public List<Claim> GetClaimsByLevelorder2(String status);
    public ResponseEntity<HttpStatus> updateClaimDecision(long claimId);




}
