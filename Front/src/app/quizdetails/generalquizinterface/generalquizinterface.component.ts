import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizListComponent } from 'projects/back-office/src/app/Appointment/quiz-list/quiz-list.component';
import { Result } from 'projects/back-office/src/app/models/appointement';
import { Quiz } from 'projects/back-office/src/app/models/quiz';
import { ClassroomService } from 'projects/back-office/src/app/services/classroom.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-generalquizinterface',
  templateUrl: './generalquizinterface.component.html',
  styleUrls: ['./generalquizinterface.component.css']
})
export class GeneralquizinterfaceComponent implements OnInit{

  showingHistorique:boolean=false
  passingQuiz:boolean=false;
  resultDisplay:boolean=false;
  quizResulting:Quiz=new Quiz();
  currentQuiz!:Quiz;
  result:Result
  userId:number=2
   quizItems : any[];  
   user!:User;
   listresults:Result[]=[]
  constructor(private classRoomS:ClassroomService, private router: Router,private acr:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"))
    this.acr.params.subscribe(params => {
      let id = params['id'];
      console.log("starting id"+id);
      
      this.classRoomS.getAllQuiz(this.user.id).subscribe((data)=>{
    console.log("empty things")
        console.log(data)
      this.quizItems=data ;
    })
  })
}
  passStringToQuestions(quiz: any) {
    //this.router.navigate(['/quiztest', { quizName: quizName }]);
    this.currentQuiz=quiz 
    this.passingQuiz=!this.passingQuiz;
    
  }

  handleFinishquiz(result:Result) {
    this.passingQuiz=!this.passingQuiz;
    this.result=result;
    this.resultDisplay=!this.resultDisplay;
  }
  showResult(result:Result){
    
    this.passingQuiz=false
    this.result=result;
    this.resultDisplay=!this.resultDisplay;
  }
  handleFinishResult() {
    this.resultDisplay=!this.resultDisplay;
    
  }
  getAllcategory(id :Number){
    this.router.navigate(['/all_category',id]);
    
    }



    dealeteQuiz(id: number) {
      this.classRoomS.deleteQuiz(id).subscribe(()=>{

        location.reload();
      }
  
      )

    
      }

      QuizDetail(id: number) {
        this.router.navigate(['/quizdetail', id]);
        }

        Quizresults(id:number){

          this.quizResulting.id=id
            this.classRoomS.getResultsQuizs(id).subscribe(data=>{
              this.quizResulting.id=id
              this.listresults=data;
              this.showingHistorique=true
            })
        }
        QuizresultsDynamique(id:number):Result[]{
          this.classRoomS.getResultsQuizs(id).subscribe(data=>{
            this.listresults=data;
            return data;
          })
          return null;
      }

}


