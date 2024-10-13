import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '../../models/classroom';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css']
})
export class AddClassroomComponent implements OnInit {
  localclassroom:Classroom=new Classroom()
  errorMessage: string;

     
  constructor(private Classroomadd :ClassroomService,  private router: Router, private acr: ActivatedRoute, private fb: FormBuilder){  }
  classroomForm !:FormGroup;
  submitted !: false ;
  // intialisation lel form 
  ngOnInit(): void {
    //this.id=this.acr.snapshot.params['id']
    this.localclassroom.id=0
    this.classroomForm=new FormGroup({
      block:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required),
      classRoomNumber:new FormControl(0,Validators.required),
      /* --------------------------------------- */

      year:new FormControl(0, [Validators.required, Validators.min(new Date().getFullYear())]),
      month:new FormControl(0,Validators.required),
      days:new FormControl(0,Validators.required),
      startHours:new FormControl(0,Validators.required),
      startMinutes:new FormControl(0,Validators.required),
      endHours:new FormControl(0,Validators.required),
      endMinutes:new FormControl(0,Validators.required),

      id:new FormControl(0),
    })

    this.localclassroom.id=0
        // ken yal9a parameetre id ijiibou 
      this.acr.params.subscribe(params=>{
        this.fetchClassroom(params['id'])
        
       


      })
   
      
  }

  // condition 3all date 
  validateDate(control: AbstractControl): { [key: string]: any } | null {
    const year = control.get('year')?.value;
    const month = control.get('month')?.value;
    const days = control.get('days')?.value;
  
    const selectedDate = new Date(year, month - 1, days);
    const currentDate = new Date();
  
    if (selectedDate <= currentDate) {
      return { 'pastDate': true };
    }
  
    return null;
  }


  add() {
    console.log("classroom added");
  
    // ... (other console.log statements)
  
    const selectedYear = this.classroomForm.get('year').value;
    const selectedMonth = this.classroomForm.get('month').value;
    const selectedDay = this.classroomForm.get('days').value;
  
    // Check if the selected date is before today's date
    
    const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    const today = new Date();
  // comparii date louma walla le 
    if (selectedDate <= today) {
      this.errorMessage = "Selected date cannot be before today's date";
      return;
    }
  // affectation
  this.localclassroom.block=this.classroomForm.get('block').value
  this.localclassroom.level=this.classroomForm.get('level').value
  this.localclassroom.classRoomNumber=this.classroomForm.get('classRoomNumber').value
    this.localclassroom.start = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay,
      this.classroomForm.get('startHours').value,
      this.classroomForm.get('startMinutes').value
    );
    this.localclassroom.end = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay,
      this.classroomForm.get('endHours').value,
      this.classroomForm.get('endMinutes').value
    );
  
    // ... (similar block for 'end' date)
  
    console.log(this.localclassroom);
  // subscribe heya elii bech t ajoutii
    this.Classroomadd.addClassroom(this.localclassroom).subscribe((data) => {
      console.log("classroom added");
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "ClassRoom Added",
      showConfirmButton: false,
      timer: 1500
    });
  
    this.goToClassroomList();
  }
  
// fetch marbouta bill id ell fou9anii mta3 ell param 
// ou set data
      fetchClassroom(id : number){
            this.Classroomadd.getClassroombyId(id).subscribe((data)=>{
              console.log(data)
              this.localclassroom=data
          
            this.classroomForm.setValue({
            block : this.localclassroom.block,
            level: this.localclassroom.level,
            classRoomNumber : this.localclassroom.classRoomNumber,
            year: new Date(this.localclassroom.start).getFullYear(),
            month: (new Date(this.localclassroom.start).getMonth() + 1), // Adding 1 to get the correct month
            days: new Date(this.localclassroom.start).getDate(),
            startHours: new Date(this.localclassroom.start).getHours(),
            startMinutes: new Date(this.localclassroom.start).getMinutes(),
            endHours: new Date(this.localclassroom.end).getHours(),
            endMinutes: new Date(this.localclassroom.end).getMinutes(),
            

            id : data.id
          })
          console.log(this.localclassroom)
       
        })

        
      }


      goToClassroomList(){
        this.router.navigate(['/classrooms']);
      }


/* -------------------- Affichage time ------------------------------------- */
getYears(): number[] {
  const years = [];
  for (let year = 2023; year <= 2050; year++) {
    years.push(year);
  }
  return years;
}

getMonths(): number[] {
  return Array.from({ length: 12 }, (_, index) => index + 1);
}

getDays(): number[] {
  return Array.from({ length: 31 }, (_, index) => index + 1);
}

getHours(): number[] {
  return Array.from({ length: 24 }, (_, index) => index);
}

getMinutes(): number[] {
  return [0,30]
}











    }


