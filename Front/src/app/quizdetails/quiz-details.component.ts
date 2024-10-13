import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'projects/back-office/src/app/services/classroom.service';
import { Question } from '../model/Questions';
import { Quiz } from 'projects/back-office/src/app/models/quiz';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  LocalQuestion: Question = new Question();
  QuestionForm !: FormGroup;
  id!: any ;
  test:any ;
  questionList : any=[];


  constructor(private questionadd: ClassroomService, private acr: ActivatedRoute, private fb: FormBuilder) {
   

  }

  ngOnInit(): void {

  /*   this.questionadd.affichertouslesquestions.subscribe((data:Question[])=>{
      this.questionList=data;
      console.log(data);
    })
 */

    this.id=this.getRouteId()

    this.questionadd.afficherUneQuiz(this.id).subscribe((data: any) => {
      this.test = data;
this.questionList=this.test.questions;
      console.log("message " + data);
    });


    
    this.QuestionForm = new FormGroup({
      question: new FormControl(  '', Validators.required),
      coefficient:new FormControl(0,Validators.required),
      options0: new FormControl('', Validators.required),
      options1: new FormControl('', Validators.required),
      options2: new FormControl('', Validators.required),
      options3: new FormControl('', Validators.required),
      options4: new FormControl('', Validators.required),
      options5: new FormControl('', Validators.required),
      answer: new FormControl(0, Validators.required),
      optionNumber: new FormControl(0),
      id: new FormControl(0),
    })


  }
  getRouteId():number{
    this.acr.params.subscribe(params => {
      this.id = params['id'];
    });
    return this.id
  }
  get optionNumber(): number {
    return this.QuestionForm.get('optionNumber').value;
  }
  minusOption() {
    if (this.optionNumber > 1) {
      this.QuestionForm.get('optionNumber').setValue(this.optionNumber - 1);
    }
  }

  addOption() {
    if (this.optionNumber < 6) {
      this.QuestionForm.get('optionNumber').setValue(this.optionNumber + 1);
    }
  }

  getRange(): number[] {
    const optionNumber = this.QuestionForm.get('optionNumber').value;
    return Array(optionNumber).fill(1).map((x, i) => i);
  }


  add() {
  this.LocalQuestion.question = this.QuestionForm.get('question').value;
  this.LocalQuestion.options = [];
  for (let i = 0; i < this.optionNumber; i++) {
    const mystring = 'options' + i;
    this.LocalQuestion.options.push(this.QuestionForm.get(mystring).value);
  }
  this.LocalQuestion.optionNumber = this.QuestionForm.get('optionNumber').value;
  // Update answer based on the value of the text input field associated with the checkbox
  this.LocalQuestion.answer = this.QuestionForm.get('answer').value;
  this.LocalQuestion.id = this.QuestionForm.get('id').value;
  this.LocalQuestion.coefficient = this.QuestionForm.get('coefficient').value;

  this.questionadd.createQuestion(this.LocalQuestion, this.getRouteId()).subscribe((data) => {
    const foundIndex = this.questionList.findIndex((item: { id: string; }) => item.id === this.LocalQuestion.id);

    if (foundIndex !== -1) {
      // Item found, update its DATA property directly
      this.questionList[foundIndex] = data;
      this.questionList[foundIndex].optionNumber=data.options.length
    } else {
      this.questionList.push(data);  
    }
  });
}


  
  updatequestion(c:any){
    console.log(c)

    this.QuestionForm.get('question').setValue(c?.question);
    this.QuestionForm.get('answer').setValue(c?.answer);
    this.QuestionForm.get('id').setValue(c?.id);
    this.QuestionForm.get('coefficient').setValue(c?.coefficient);
    this.QuestionForm.get('optionNumber').setValue(c?.options.length);
    for (let i = 0; i < this.optionNumber; i++) {
      const mystring = 'options' + i;
      console.log("updating",c?.['options' + i])
      this.QuestionForm.get(mystring).setValue(c?.options[i]);
    }
    
  }

  deleatequestion(c:any)
 {
    this.questionadd.deleteQuiz(c.id).subscribe((data)=> {
        this.questionList.pop(c);
    })
 }


}
