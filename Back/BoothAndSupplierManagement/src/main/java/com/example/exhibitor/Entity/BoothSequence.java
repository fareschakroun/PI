package com.example.exhibitor.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class BoothSequence {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id ;

    private long smallBoothSequence=0 ;
    private long mediumBoothSequence=0 ;
    private long bigBoothSequence=0 ;
}
