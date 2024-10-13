import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { aN } from '@fullcalendar/core/internal-common';
import { Category } from 'projects/back-office/src/app/models/category';
import { Quiz } from 'projects/back-office/src/app/models/quiz';
import { ClassroomService } from 'projects/back-office/src/app/services/classroom.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  QuestionForm !: FormGroup;
  user!:User;

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"))
    this.QuestionForm = new FormGroup({
      title: new FormControl(  '', Validators.required),
      category:new FormControl('',Validators.required), 
      userId: new FormControl(this.user.id)
    
  })
}

  newCategory: String;
  quiz: any = { title: '' ,category:''}; // Initialize quiz object here
  
  constructor(private quizService: ClassroomService, private router: Router) {}

  onAddCategory() {
    this.quiz.title = this.newCategory;
    console.log(this.quiz);
    this.quizService.ajoutnewQuiz(this.QuestionForm).subscribe({ });
    
  }

  add() {
    this.quizService.ajoutnewQuiz(this.QuestionForm.value).subscribe({ });
    location.reload()
    }
}
