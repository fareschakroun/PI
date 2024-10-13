import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: Question[];

  constructor(private questionService: ClassroomService) { }

  ngOnInit(): void {
    // this.getQuestions();
  }

  // getQuestions(): void {
  //   this.questionService.getAllQuestions().subscribe(questions => {
  //     this.questions = questions;
  //   });
  // }

}
