import { Injectable } from '@angular/core';
import { Question } from './model/Questions';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceFront {


  Url_questions = "http://localhost:8095/api/AppointementAndClassrooms"
  constructor(private http:HttpClient) { }

  getAllQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(this.Url_questions+'/allquestions')
  }

}
