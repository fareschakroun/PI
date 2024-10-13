package com.example.appointementandclassroom.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class QuizCreate {

   private  int numQ;

   private  String title ;
   private  String  category ;
}
