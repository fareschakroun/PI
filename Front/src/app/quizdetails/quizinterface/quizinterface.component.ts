import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../model/Questions';
import { ServiceFront } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
import {ClassroomService} from "../../../../projects/back-office/src/app/services/classroom.service";
import { Quiz } from 'projects/back-office/src/app/models/quiz';
import Swal from 'sweetalert2';
import { AnswerSheet, Result } from 'projects/back-office/src/app/models/appointement';

@Component({
  selector: 'app-quizinterface',
  templateUrl: './quizinterface.component.html',
  styleUrls: ['./quizinterface.component.css']
})

export class QuizinterfaceComponent implements OnInit{




  @Input() quiz:Quiz;
  @Output() quizFinished: EventEmitter<Result> = new EventEmitter<Result>();

questionList:Question[]=[]
currentAnswer:string[]=[]
currentQuestion:Question
questionTracker:number=0
quizCompleted:boolean=false;
timer: any; // Variable to hold the timer reference
timeElapsed: number = 0; // Variable to track the elapsed time
constructor(private quizService:ClassroomService,){

}
ngOnInit(): void {
  this.quizService.getQuizQuestion(this.quiz).subscribe((data)=>{
    this.questionList=data;
    this.currentQuestion=data[0];
    console.log(this.currentQuestion)
    this.startTimer();
  })

  
}

insideSelected(option : string):boolean {

  return this.currentAnswer[this.questionTracker]==option;
}

MyAnswer(arg0: number,_t10: string) {
  this.currentAnswer[arg0]=_t10
  this.NextQuestion()
}


NextQuestion() {
  if (this.questionTracker<this.questionList.length-1){
    this.questionTracker++;
    this.currentQuestion=this.questionList[this.questionTracker];
  }
}
  PreviousQuestion() {
    if (this.questionTracker>0){
    this.questionTracker--;
    this.currentQuestion=this.questionList[this.questionTracker];
  }
}


ViewQuiz() {
  let answerSheet:AnswerSheet=new AnswerSheet()
  answerSheet.answers=this.currentAnswer;
  answerSheet.quizId=this.quiz.id
  answerSheet.userId=1
  answerSheet.elaspsedTime=this.timeElapsed
  console.log(answerSheet)
  this.quizService.submitQuizAnswerSheet(answerSheet).subscribe((data)=>{


    console.log(data)
    this.quizFinished.emit(data);
    
 })
}











//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TImer THINGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TImer THINGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TImer THINGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TImer THINGS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
startTimer() {
  this.timer = setInterval(() => {
    this.timeElapsed += 10; 
  }, 10);
}

formatTime(time: number): string {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60); 
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24); 

  return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}:${this.pad(milliseconds, true)}`;
}
pad(num: number, isMilliseconds: boolean = false): string {
  if (isMilliseconds) {
    return num < 10 ? '00' + num : num < 100 ? '0' + num : num.toString();
  } else {
    return num < 10 ? '0' + num : num.toString();
  }
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

}
