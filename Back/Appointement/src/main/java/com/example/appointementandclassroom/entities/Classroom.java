package com.example.appointementandclassroom.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Classroom {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private     int id ;
    private     String  block ;
    private     int  classRoomNumber;
    private     String   level;
    @Temporal(TemporalType.TIMESTAMP)
    private      Date start ;
    @Temporal(TemporalType.TIMESTAMP)
    private      Date end ;



    @OneToMany(cascade = CascadeType.ALL, mappedBy="classroom")
    private Set<Appointement> Appointements;


}
