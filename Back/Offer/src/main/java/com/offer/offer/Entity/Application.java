package com.offer.offer.Entity;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Application implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id ;
    @Lob
    @ApiModelProperty
    @Column(columnDefinition = "LONGBLOB")
    private byte[] lettreDeMotivation;
    private LocalDateTime applicationDate;
    private long idCandidat;
    @ManyToOne
    private Offer offer;
    @Enumerated(EnumType.STRING)
    private Status status;
}


