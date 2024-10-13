//import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom } from '../../models/classroom';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.css']
})
export class UpdateClassroomComponent implements OnInit  {


  constructor(private Classroomadd :ClassroomService, /*private router:Route*/  private router: Router){  }
  classroomForm !:FormGroup;
  ngOnInit(): void {
    //this.id=this.acr.snapshot.params['id']
    this.classroomForm=new FormGroup({
      block:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required),
      classRoomNumber:new FormControl('',Validators.required),
      
    }) }
    add(){
      this.Classroomadd.addClassroom(this.classroomForm.value).subscribe (()=>{
        console.log( "classroom added")
        console.log("classroom"+JSON.stringify(this.classroomForm.value))})
        this.goToClassroomList();
      }

      goToClassroomList(){
        this.router.navigate(['/classrooms']);
      }

}
