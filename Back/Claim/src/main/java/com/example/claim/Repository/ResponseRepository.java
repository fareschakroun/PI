package com.example.claim.Repository;

import com.example.claim.Entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    Optional<Response> findByClaimIdClaim(Long claimId);
}
