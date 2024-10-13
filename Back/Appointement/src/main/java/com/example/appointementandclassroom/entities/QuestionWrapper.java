package com.example.appointementandclassroom.entities;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionWrapper {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  int id ;
    private  String question ;
   private List<String> options ;

}
