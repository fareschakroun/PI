import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz';
import { ClassroomService } from '../../services/classroom.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../models/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  localquiz:Quiz=new Quiz()
  LocalQuestion= new Question()

  errorMessage: string;
  constructor(private QuizAdd :ClassroomService,  private router: Router){  }
  quizForm !:FormGroup;
  numQ!:number;
  ngOnInit(): void {
   /*  this.localclassroom.id=0
    this.classroomForm=new FormGroup({
      block:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required), */

this.localquiz.id= 0;

this.quizForm= new FormGroup({
title: new FormControl('',Validators.required),
numQ : new FormControl('',Validators.required),
category : new FormControl('',Validators.required),

  })

}


addQuiz(){
    


   this.QuizAdd.createQuiz(this.quizForm.value).subscribe(()=>{

    console.log("quiz add");

   });
   
   this.goToQuizList();
 }


 goToQuizList(){
  this.router.navigate(['/listequiz']);
  

 }

}

