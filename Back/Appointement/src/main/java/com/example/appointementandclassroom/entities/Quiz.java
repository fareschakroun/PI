package com.example.appointementandclassroom.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  int id ;
    private  String title ;
    private  String categorie;
    private int userId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="quiz")
    private List<Question> Questions;
    private int optionNumber;

}
