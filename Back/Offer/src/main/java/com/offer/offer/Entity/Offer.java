package com.offer.offer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import io.swagger.annotations.ApiModelProperty;

import org.springframework.web.multipart.MultipartFile;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Offer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id ;
    private String titre;
    private String description;
    private LocalDate lastDateApplication;
    private int nbrCandidature;
    @Lob
    @ApiModelProperty
    @Column(columnDefinition = "LONGBLOB")
    private byte[] file;
    private long exibitorId ;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,
            mappedBy="offer")
    private List<Application> applications;
    @Enumerated(EnumType.STRING)
    private TypeOffer offer;
}
