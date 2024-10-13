import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit{

quiz : Quiz[];
constructor(private quizservice : ClassroomService){}
ngOnInit(): void {
  
this.getQuiz();

}
getQuiz(): void{
  this.quizservice.getAllQuizs().subscribe((data)=>{
    this.quiz = data 
  })
  
}

}



