import { User } from "src/app/models/user";

export class Appointement {


    id!:number ;
    startTime!: Date;
    endTime!: Date ;
    eventName!: string ;
    receiver!:number;
    sender!:number;
    isAllDay: false;

  
}
export class calenderEvent{
    start!:Date;
    end!:Date;
    title:string="Available";
    color:string="green  "
}
export class Result {
    id: number;
    userId: number;
    score: number;
    quizId: number;
    time: Date;
    elapsedTime:number; 
    coefficient: number;
    maxScore:number;
    fullUser:User;
}

export class AnswerSheet{
        answers:string[];
        userId:number;
        quizId:number;
        elaspsedTime:number;
        
}