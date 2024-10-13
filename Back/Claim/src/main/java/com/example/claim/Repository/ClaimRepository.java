package com.example.claim.Repository;

import com.example.claim.Entity.Claim;
import com.example.claim.Entity.ClaimType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ClaimRepository extends JpaRepository<Claim,Long> {
    @Query("SELECT m FROM Claim m WHERE m.title=:title")
    List<Claim> findBysubject(@Param("title") ClaimType subject);


    @Query("SELECT m FROM Claim m WHERE m.status=:status")
    List<Claim> findBystatus(@Param("status") String status);

    Optional<Claim> findByDate(String date);

    //@Query("SELECT c FROM Claim c WHERE c.IdUser=:IdUser")
    //Optional<Claim> findByIdUser (Long idUser) ;


    @Query("SELECT COUNT(m) FROM Claim m")
    long getNumberOfClaims();


    @Query("SELECT m FROM Claim m ORDER BY m.level ASC")
    List<Claim> getClaimsByLevelorder();


    @Query("SELECT m FROM Claim m ORDER BY m.level DESC")
    List<Claim> getClaimsByLevelorder2();
}
