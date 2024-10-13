package com.example.appointementandclassroom.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question {



    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  int id ;
      private  String question ;
   @ElementCollection
  @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
       @Column(name = "option")
      private List<String> options;
      private  String answer ;
      private  String difficultylevel ;
      private int coefficient;

      @JsonIgnore
      @ManyToOne
      Quiz quiz;

}
