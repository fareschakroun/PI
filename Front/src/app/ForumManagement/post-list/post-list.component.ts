import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { ForumService } from 'src/app/services/forum.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostFormComponent } from 'src/app/ForumManagement/post-form/post-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Tag } from 'src/app/models/tag';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;

  posts! : Post[];
  comments! : Comment[];
  closeResult!:string;
  form : boolean = false;
  currentPage = 0;
  pageSize = 4;
  tagList:Tag[]=[]
  @ViewChild('exampleModal') exampleModal: any;

  postToUpdate!: Post 
  myControl = new FormControl();

  options: string[] = ['Angular', 'React', 'Vue', 'JavaScript', 'TypeScript'];
  filteredOptions: Observable<string[]>;
  user:User;
  constructor(
    private router: Router,
    private service: ForumService,
    private matDialog:MatDialog,
    private modalService: NgbModal,
    
  ){    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );}
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (!this.options.some(option => option.toLowerCase() === value.toLowerCase())) {
      // Add the entered value to the options array
      this.options.push(value);
    }
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"))
   // this.getPosts();
   console.log('ngOnInit called');
   this.loadPosts();
   }

  /* private getPosts(){
    this.service.getPostsList().subscribe (
      (response: Post[]) => {
        console.log("salma 1" + response);
        this.posts = response;
        console.log("salma 2" + this.posts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  loadPosts(){
    console.log("Entered")
    this.service.getPostsList(this.currentPage, this.pageSize)
    .subscribe(
      (response: Post[]) => {
        console.log(response)
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching posts:', error);
        console.log(error)

      }
    );
  }
  onOptionSelected(event: any) {
    // Custom function to execute when an option is selected
    console.log('Selected option:', event.option.value);
   this.service.findTagByName(event.option.value).subscribe((data)=>{
    this.tagList.push(data)
    this.service.findbyTags(this.tagList).subscribe((Response)=>{
      this.posts=Response;
      
      console.log(Response)
    })
   })
  }
  nextPage(): void {
    this.currentPage++;
    this.loadPosts();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  navigateToPost(IdPost: number) { 
    console.log(IdPost,"HHH")
    console.log(this.router.navigate(['/post-detail/'+ IdPost]),"fff")
    //this.router.navigate(['/post-detail/'+ IdPost]);
  }

  openDialog(){
    this.matDialog.open(PostFormComponent,{
      width: '50%',
      height: 'auto',
      maxWidth: '500px', // Limiting maximum width to avoid overly large dialogs on larger screens
      maxHeight: '100%', // Limiting maximum height to avoid overly tall dialogs
      autoFocus: false, // Disabling autofocus to prevent the first input field from being focused automatically
      panelClass: 'custom-dialog-container'
      })
  }

  deletePost(postId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePost(postId).subscribe(
          () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success"
            }).then(() => {
              this.loadPosts(); // Reload posts after successful deletion
            });
          },
          (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the post.",
              icon: "error"
            });
          }
        );
      }
    });
  }
 /* deletePost(postId: number) {
    const dialogRef = this.modalService.open(this.confirmationDialog);
    dialogRef.result.then((result) => {
      if (result === 'confirm') {
        this.service.deletePost(postId).subscribe(() => this.loadPosts());
      }
    }).catch((reason) => {
      console.log(`Dismissed with reason: ${reason}`);
    });
  }*/

 /* editPost(post : Post){
    this.service.updatePost(post).subscribe();
  }*/
 /* edit(post: any){
    this.postToUpdate = post;
   
  }*/


  edit(post: Post): void {
    // Copier l'objet post dans postToUpdate
    this.postToUpdate = post;
    console.log("Post to update")
    console.log(this.postToUpdate)
    // Ouvrir une boîte de dialogue SweetAlert avec des champs d'entrée préremplis avec les informations existantes
    Swal.fire({
      title: 'Edit Post',
      html:
        `<input id="title" class="swal2-input" value="${this.postToUpdate.title}">` +
        `<textarea id="description" class="swal2-textarea">${this.postToUpdate.descriptionSubject}</textarea>`,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        // Mettre à jour l'objet postToUpdate avec les informations éditées des champs d'entrée de la boîte de dialogue SweetAlert
        this.postToUpdate.title = (<HTMLInputElement>document.getElementById('title')).value;
        this.postToUpdate.descriptionSubject = (<HTMLTextAreaElement>document.getElementById('description')).value;
        // Appeler la méthode updatePost avec le post mis à jour
        this.service.updatePost(this.postToUpdate).subscribe((resp: Post) => {
          // Show success message using Swal
          Swal.fire({
            icon: 'success',
            title: 'Post Updated Successfully!',
            text: 'Your changes have been saved.',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally, you can perform additional actions after the user clicks "OK"
            // For example, you may want to refresh the list of posts
            this.loadPosts();
          });
        },
        (err) => {
          // Show error message using Swal
          Swal.fire({
            icon: 'error',
            title: 'Error Updating Post',
            text: 'An error occurred while updating the post. Please try again later.',
            confirmButtonText: 'OK'
          });
          console.error('Error updating post:', err);
        }
      );
      }
    });
  }
  
  
  updatePost(): void {
    // Call the service method to update the post
    this.service.updatePost(this.postToUpdate).subscribe(
      (resp: Post) => {
        // Show success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Post Updated Successfully!',
          text: 'Your changes have been saved.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Optionally, you can perform additional actions after the user clicks "OK"
          // For example, you may want to refresh the list of posts
          this.loadPosts();
        });
      },
      (err) => {
        // Show error message using Swal
        Swal.fire({
          icon: 'error',
          title: 'Error Updating Post',
          text: 'An error occurred while updating the post. Please try again later.',
          confirmButtonText: 'OK'
        });
        console.error('Error updating post:', err);
      }
    );
  }
  /*updatePost(){
    this.service.updatePost1(this.postToUpdate).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
      
    );
    this.exampleModal.hide();
  }*/

  searchForTag(tag:Tag){
    
  }
}
