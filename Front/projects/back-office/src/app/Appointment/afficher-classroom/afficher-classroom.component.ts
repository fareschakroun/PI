import { Component, HostListener, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom } from '../../models/classroom';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-afficher-classroom',
  templateUrl: './afficher-classroom.component.html',
  styleUrls: ['./afficher-classroom.component.css']
})
export class AfficherClassroomComponent implements OnInit{
constructor(private classRoomS:ClassroomService, private router:Router){}
 
// tableau 
classroomList : Classroom[]=[];
ngOnInit(): void {
  this.classRoomS.getAllClassrooms().subscribe((data:Classroom[])=>{
    this.classroomList=data; 
    console.log(data);
  })
}

updateClassroom(id :Number){
this.router.navigate(['/addclassroom',id]);

}
deleateClassroom(id :number){
  this.classRoomS.deleteClassroom(id).subscribe(()  => {
    this.classroomList = this.classroomList.filter((c: Classroom) => c.id !== id)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Delete Succesfull!",
    });
  })
  
}

showFree:boolean =true ;
freeappointementList : any []=[]
showDatesModal  : boolean = false ;
/* --------------------------------- */

showDatesList: boolean = false;

showFreeDates(id: number): void {
  this.classRoomS.getFreeAppointements(id).subscribe((data: any) => {
    this.freeappointementList = data;
   
    this.freeappointementList = data // Adjust the properties based on your data model
    this.showDatesModal = true;
  });

}
@HostListener('scroll', ['$event'])
  public onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.addMoreItems(10);
    }
  }

private addMoreItems(addNewItemCount: number) {
  const currentItemCount = this.freeappointementList.length;
  if (currentItemCount === this.freeappointementList.length) { return; }
  alert('Adding new items to the list');
  const temp = this.freeappointementList.slice(currentItemCount, currentItemCount + addNewItemCount);
  this.freeappointementList = [...this.freeappointementList, ...temp];
}

hideFreeDatesModal(): void {
 
  this.showDatesModal = false;
}
}
