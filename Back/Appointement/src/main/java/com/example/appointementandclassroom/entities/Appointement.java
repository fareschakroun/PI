package com.example.appointementandclassroom.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Appointement {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date start ;
    @Temporal(TemporalType.TIMESTAMP)
    private Date end ;
    private String title ;
    private int sender;
    private  int receiver ;
    @Enumerated(EnumType.STRING)
    private AppointementType appointementType ;


    @JsonIgnore
    @ManyToOne
    Classroom classroom;


}
