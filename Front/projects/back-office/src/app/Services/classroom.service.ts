import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';
import { AnswerSheet, Appointement, Result } from '../models/appointement';
import { Quiz } from '../models/quiz';
import { Question } from 'src/app/model/Questions';


@Injectable({
  providedIn: 'root'
})
export class     ClassroomService {
  

//   classroomURL = 'http://172.16.4.58:8095/api/AppointementAndClassrooms'
 classroomURL = 'http://localhost:8222/api/AppointementAndClassrooms'
  constructor(private http:HttpClient) { }



     //------------------------Service----------------------------------
    // ----------------------- Classroom----------------------------
   //------------------------------------------------------------------



  getAllClassrooms():Observable<Classroom[]>{
    return this.http.get<Classroom[]>(this.classroomURL+'/all_Classroom')
  }
  getFreeAppointements(clasroomid:number):Observable<any[]>{
    return this.http.get<any[]>(this.classroomURL+'/getFreeDatesPerClassroom/'+clasroomid)
  }



   addClassroom(Classroom:Classroom):Observable<Classroom[]>{
    console.log("sending")
    console.log(Classroom);
    return this.http.post<Classroom[]>(this.classroomURL+'/add_Classroom ',Classroom)
  }


  upadateClassroom(id:number,Classroom:Classroom):Observable<Classroom[]>
  {
    return this.http.put<Classroom[]>(this.classroomURL+'/update_Classroom',Classroom)
  }


  getClassroombyId(id:number):Observable<Classroom>{
    return this.http.get<Classroom>(this.classroomURL+'/getClassroom/'+ id)
  }




  deleteClassroom(id : number){
    //return this.http.delete<Classroom[]>(this.classroomURL+'/deleteClassroom'+id)
    return this.http.delete(`${this.classroomURL}/deleteClassroom/${id}`)
  }


  //------------------------Service----------------------------------
  // ----------------------- Appointement----------------------------
  //------------------------------------------------------------------


getAllAppointement():Observable<Appointement[]>{
  return this.http.get<Appointement[]>(this.classroomURL+'/all_Appointement')
}

addAppointement(Appointement:any):Observable<any[]>{
  return this.http.post<any[]>(this.classroomURL+'/add_Appointement',Appointement)
}



upadateAppointement(id:number,Appointement:Appointement):Observable<Appointement[]>
{
  return this.http.put<Appointement[]>(this.classroomURL+'/update_Appointement',Appointement)
}

deleteAppointement(id:number)
{
   return this.http.delete<Appointement[]>(this.classroomURL+'/deleteAppointement/'+id)
}




showAvailability():Observable<Date[]>{
  return this.http.get<Date[]>(this.classroomURL+"/availableTime")
}

getMyAppoitement(iduser:number):Observable<Appointement[]>{
  return this.http.get<Appointement[]>(this.classroomURL+"/all_Appointement_foryouser/"+iduser)
}
getFullAppointement(idappointement:number):Observable<Appointement> {
  return this.http.get<Appointement>(this.classroomURL+"/getAppointement/"+idappointement)
}



  //------------------------Service----------------------------------
  // ----------------------- Quiz----------------------------
  //------------------------------------------------------------------


/*

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.classroomURL}/allquestions`);
  }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.classroomURL}/category/${category}`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.classroomURL}/add questions`, question);
  }

  createQuiz(category: string, numQ: number, title: string): Observable<string> {
    const params = { category: category, numQ: numQ.toString(), title: title };
    return this.http.post<string>(`${this.classroomURL}/create Quiz`, params);
  }

  getQuizQuestions(id: number): Observable<any> {
    return this.http.get<any>(`${this.classroomURL}/Get Quiz Question/${id}`);
  }

  submitQuiz(id: number, responses: any[]): Observable<number> {
    return this.http.post<number>(`${this.classroomURL}/Submit/${id}`, responses);
  }
 */

  createQuiz(object : any): Observable<string> {

    return this.http.post<string>(this.classroomURL+"/createQuiz", object);
  }
  getQuestionsByQuizId(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.classroomURL+"/afficher-une-quiz/"+id)
  }

  createQuestion(question: any,id:any): Observable<any> {

    return this.http.post(this.classroomURL+"/add-questions/"+id, question);
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.classroomURL}/allquestions`);
  }


  getAllQuizs():Observable<any[]>{
    return this.http.get<any[]>(this.classroomURL+'/AllQuiz')
  }



  getAllcategory():Observable<any[]>{
    return this.http.get<any[]>(this.classroomURL+'/all_category')
  }


  getAllQuiz(quiz:number):Observable<any[]>{
    return this.http.get<any[]>(this.classroomURL+'/afficherQuizes/'+quiz)
  }


  ajoutnewQuiz(object : any): Observable<void> {

    return this.http.post<void>(this.classroomURL+"/ajoutnewQuiz", object);
  }


  deleteQuiz(id:number)
{
   return this.http.delete<void>(this.classroomURL+'/deleteByID/'+id)
}


afficherUneQuiz(iduser:number):Observable<any>{
  return this.http.get<any>(this.classroomURL+"/afficher-une-quiz/"+iduser)
}


affichertouslesquestions(): Observable<Question[]> {
  return this.http.get<Question[]>(`${this.classroomURL}/afficher-tous-les-question`);
}

getQuizQuestion(quiz:Quiz):Observable<Question[]>{
  return this.http.get<Question[]>(this.classroomURL+"/Get_Quiz_Question/"+quiz.id);
}

submitQuizAnswerSheet(AnswerSheet:AnswerSheet):Observable<Result>{
  return this.http.post<Result>(this.classroomURL+"/SubmitAdvanced",AnswerSheet);
}

//---------- quiz  Jdii Service 
getResultsQuizs(id:number):Observable<Result[]>{
  return this.http.get<Result[]>(this.classroomURL+"/quizResult/"+id);
}


}
