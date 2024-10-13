import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { data } from 'jquery';
import { Result } from 'projects/back-office/src/app/models/appointement';
import { Quiz } from 'projects/back-office/src/app/models/quiz';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quiz-result-list',
  templateUrl: './quiz-result-list.component.html',
  styleUrls: ['./quiz-result-list.component.css']
})
export class QuizResultListComponent implements OnInit{

  @Input() listResult:Result[]
  @Input() quiz:Quiz;
  @Output() quizFinished: EventEmitter<Result> = new EventEmitter<Result>();
  user:User

constructor(private userService:UserService){

}
  ngOnInit(): void {

    // this.listResult.forEach(element => {
    //   element.fullUser=this.getUser(element.userId)
    // });

  }
  outputResult(result:Result){
    this.quizFinished.emit(result)
  }

  getUser(userid:number):User{
    this.userService.getUser(userid.toString()).subscribe(data=>{
      return data
    })
    return null;
  }
}
