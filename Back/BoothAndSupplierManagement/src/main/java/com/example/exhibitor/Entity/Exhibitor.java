package com.example.exhibitor.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Exhibitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id ;
    private String ExhibitorName;
     @ElementCollection
     List<Integer> boothId ;
     @OneToMany(mappedBy = "exhibitor",cascade = CascadeType.ALL)
     List<Booth> booth ;

     public Long userID ;


}
