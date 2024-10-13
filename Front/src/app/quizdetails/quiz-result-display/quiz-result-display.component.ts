import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from 'projects/back-office/src/app/models/appointement';

@Component({
  selector: 'app-quiz-result-display',
  templateUrl: './quiz-result-display.component.html',
  styleUrls: ['./quiz-result-display.component.css']
})
export class QuizResultDisplayComponent implements OnInit{
ngOnInit(): void {

 

}
@Input() result:Result;
@Output() quizFinished: EventEmitter<void> = new EventEmitter<void>();

close(){
  this.quizFinished.emit();
}
}
