import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { ForumService } from 'src/app/services/forum.service';
import { Comment, Like } from 'src/app/models/comment';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common'
import { DatePipe } from '@angular/common';import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!:Post;
  comment: Comment = new Comment();
  comments!: Comment[];
  commentSubjectId!: number;
  global = true;
  showComments = false;
  postId: number;
  textComment!:string;
  commentaire:string=''
  P!: Post;
  commentToUpdate!: Comment;
  user:User
  constructor(
    private router: ActivatedRoute,
    private service: ForumService,
    private datePipe: DatePipe,
    private userservice:UserService,
  ){this.postId = this.router.snapshot.params['id'];}

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("user"))
    this.getPost();
    this.loadComments();
  }

  getPost(): void{
    const IdPost = +this.router.snapshot.paramMap.get('id')!;
    console.log("IdPost"+ IdPost);
   this.service.getPost(IdPost).subscribe((data)=>{
    console.log(data,"AAA")
      data.comment.forEach(comment => {
        this.userservice.getUser(comment.userId.toString()).subscribe(response=>{
          console.log(response)
          comment.fullUser=response
        })
      });
    this.post=data;
    this.post.comment.forEach(element => {
      element=this.findActiveLike(element)
    });
   });
  }

  
  addComment(): void {
    if (this.commentaire!='')
    {

      this.comment.textComment=this.commentaire
      this.comment.userId=this.user.id
      this.service.addComment(this.comment, this.postId)
      .subscribe(
        (data) => {
          // location.reload(); 
          this.userservice.getUser(data.userId.toString()).subscribe(response=>{
            console.log(response)
            data.fullUser=response
            data=this.findActiveLike(data)
            this.post.comment.push(data)
          })
         
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Comment added successfully",
            showConfirmButton: false,
            timer: 500
          });
          this.commentaire=''
        
        },
        error => console.log(error)
        );
      }
  }

  loadComments(): void {
    this.service.getComments(this.postId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
        this.comments.forEach(comment => { 
          comment=this.findActiveLike(comment)
        });
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  savelike(comment: Comment, status: string) {
    console.log(comment);
    if (!comment.ActiveLike.id) {
      let like = new Like();
      like.id = 0;
      like.userID = this.user.id;
      like.status = ' ';
      like.commentID = comment.idComment;
      comment.ActiveLike = like;
    }
    
    comment.ActiveLike.status = status;

    this.service.addLike(comment.ActiveLike).subscribe((data) => {
      const correctCommentIndex = this.post.comment.findIndex(
        (c) => c.idComment === comment.idComment
      );
      if (correctCommentIndex !== -1) {
        console.log("Correct Index ")
        data.fullUser=this.post.comment[correctCommentIndex].fullUser
        console.log( this.post.comment[correctCommentIndex])
        data = this.findActiveLike(data)
        this.post.comment[correctCommentIndex] = data;
        console.log( this.post.comment[correctCommentIndex])
      }
      else{
        console.log("wrong index")
      }
     
    });
  }

  findActiveLike(comment:Comment):Comment {
    let like = new Like();
    like.id = 0;
    like.userID = this.user.id;
    like.status = ' ';
 
      // Check if comment.comment.likes is not undefined before accessing it
      if (comment.likes) {
        comment.ActiveLike =
          comment.likes.find((rate) => rate.userID == this.user.id) ||
          like;
      } else {
        comment.ActiveLike = like;
      }
      comment.ActiveLike.commentID = comment.idComment;

      return comment;
    };
   

deleteComment(commentId: number) {
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
      this.service.deleteComment(commentId).subscribe(
        () => {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success"
          }).then(() => {
            this.loadComments(); 
            location.reload();// Reload posts after successful deletion
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

edit(comment: Comment, postId: number): void {
  // Copier l'objet post dans postToUpdate
  this.commentToUpdate = comment;

  // Ouvrir une boîte de dialogue SweetAlert avec des champs d'entrée préremplis avec les informations existantes
  Swal.fire({
    title: 'Edit Comment',
    html:
      `<textarea id="description" class="swal2-textarea">${this.commentToUpdate.textComment}</textarea>`,
    showCancelButton: true,
    confirmButtonText: 'Update',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: () => {
      // Mettre à jour l'objet postToUpdate avec les informations éditées des champs d'entrée de la boîte de dialogue SweetAlert
      this.commentToUpdate.textComment = (<HTMLTextAreaElement>document.getElementById('description')).value;
      // Appeler la méthode updatePost avec le post mis à jour
      this.service.updateComment(this.commentToUpdate, postId).subscribe((resp: Comment) => {
        // Show success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Comment Updated Successfully!',
          text: 'Your changes have been saved.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Optionally, you can perform additional actions after the user clicks "OK"
          // For example, you may want to refresh the list of posts
          this.loadComments();
        });
      },
      (err) => {
        // Show error message using Swal
        Swal.fire({
          icon: 'error',
          title: 'Error Updating Comment',
          text: 'An error occurred while updating the comment. Please try again later.',
          confirmButtonText: 'OK'
        });
      
      }
    );
    }
  });
}

public onLike(idPost: number): void {
  this.service.likePost(idPost).subscribe(
    (response: void) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

}
