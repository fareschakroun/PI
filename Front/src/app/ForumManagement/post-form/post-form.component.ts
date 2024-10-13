import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post';
import { ForumService } from '../../services/forum.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit{
  post: Post = new Post();
  
  selectedFile! : File;
  //selectedVideo!: Video;
  myControl = new FormControl();
  options: string[] = ['Angular', 'React', 'Vue', 'JavaScript', 'TypeScript'];
  filteredOptions: Observable<string[]>;
  user:User;
  constructor(
    private service:ForumService,
    private router :Router,
    private http: HttpClient,
    private dialogRef: MatDialogRef<PostFormComponent>,
    private datePipe: DatePipe
    ){
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      if (!this.options.some(option => option.toLowerCase() === value.toLowerCase())) {
        // Add the entered value to the options array
        this.options.push(value);
      }
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    ngOnInit(): void {
      this.post.postTags=[]
      this.user=JSON.parse(localStorage.getItem("user"))
    }

    onFileSelected(event:any){
      this.selectedFile = event.target.files[0];
    }
    onOptionSelected(event: any) {
      // Custom function to execute when an option is selected
      console.log('Selected option:', event.option.value);
     this.service.findTagByName(event.option.value).subscribe((data)=>{
      this.post.postTags.push(data)
     })
    

    
      // Add your custom logic here
    }

    removeTag(tag:Tag){
      this.post.postTags = this.post.postTags.filter(t => t.name !== tag.name);
    }
   /* savePost(){
      const formData = new FormData();
      formData.append('file',this.selectedFile);
      formData.append('title',this.post.title);
      formData.append('descriptionSubject',this.post.descriptionSubject);
      
      this.http.post('http://localhost:8040/api/Posts/add-post', formData)
      .subscribe( response =>{
        console.log('Post saved successfully:', response);
        this.router.navigate(['/post-list']);
        this.dialogRef.close();
      },
      error => console.log('Error saving post:', error));
    }*/
 
    savePost() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      formData.append('title', this.post.title);
      formData.append('descriptionSubject', this.post.descriptionSubject);
      let listtag = '';
      this.post.postTags.forEach(element => {
          listtag += element.id +" ";
      });
      formData.append('postTags',listtag);
      formData.append('userId',JSON.stringify(this.user.id));
      this.http.post<Post>('http://localhost:8222/api/Posts/add-post', formData)
        .subscribe(response => {
          console.log('Post saved successfully:', response);
          // Navigate to the same route to reload the page
     //     this.myEvent.emit(response)
         window.location.reload();
          this.dialogRef.close();
        },
        error => console.log('Error saving post:', error));
    }

}
