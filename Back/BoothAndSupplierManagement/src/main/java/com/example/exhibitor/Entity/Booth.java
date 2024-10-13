package com.example.exhibitor.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder

public class Booth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;
    @Column(precision = 18, scale = 15)
    private BigDecimal x;
    @Column(precision = 18, scale = 15)
    private BigDecimal  y ;

    private String boothname ;


    @Enumerated(EnumType.STRING)
    BoothType boothType ;
@JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    Exhibitor exhibitor ;

    @ManyToOne
    Supplier supplier ;


}
