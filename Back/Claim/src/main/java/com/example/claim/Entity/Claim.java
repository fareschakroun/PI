package com.example.claim.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idClaim ;
    private String decision;
    private String date;
    private String status;
    private String subject;
    private String description;
    private int level;
    @Enumerated(EnumType.STRING)
    private ClaimType title;

    @Enumerated(EnumType.STRING)
    private SystemProb systemProblem ;

    @Enumerated(EnumType.STRING)
    private ServiceProb serviceProblem ;

    @Lob
    private String attachment;

    @OneToOne(mappedBy = "claim", cascade = CascadeType.ALL)
    private Response response;
}
