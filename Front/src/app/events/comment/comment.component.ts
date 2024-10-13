import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment, Comments, Like, Rating } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comments: Comments[];
  @Input() previousComment: Comment;
  replying: boolean = false;
  commenting = false;
  // paladin user

  user:User;
  currentComment: Comment;
  myform!: FormGroup;

  constructor(private eventService: EventServiceService) {}

  ngOnInit(): void {
   this.user= JSON.parse(localStorage.getItem("user"))
    this.myform = new FormGroup({
      eventID: new FormControl(this.previousComment.eventID),
      comment: new FormControl(''),
      level: new FormControl(this.previousComment.level + 1),
      thread: new FormControl(this.previousComment.id),
      userID: new FormControl(this.user.id),
      id: new FormControl(0),
      status: new FormControl('Accepted'),
    });
    console.log(this.comments);
    this.findActiveLike();
    console.log(this.comments);
  }
  reply(Comment: Comments) {
    Comment.replying = !Comment.replying;
    console.log('Started');
  }
  sendReply(comment: Comments) {
    this.myform.get('thread').setValue(comment.comment.id);
    this.myform.get('level').setValue(comment.comment.level + 1);
    this.myform.get('eventID').setValue(comment.comment.eventID);
    console.log('sending this form');
    console.log(this.myform.value);
    this.eventService.addComment(this.myform.value).subscribe((data) => {
      let mockcomments = new Comments();
      mockcomments.comment = data;
      mockcomments.list = [];
      mockcomments.level = data.level;
      let like = new Like();
      like.id = 0;
      like.userID = this.user.id;
      like.status = ' ';
      mockcomments.comment.ActiveLike = like;
      comment.list.push(mockcomments);
      comment.replying = !comment.replying;
      this.myform.get('comment').setValue('');
      this.myform.get('userID').setValue(this.user.id);
      this.myform.get('id').setValue(0);
      this.myform.get('status').setValue('Accepted');
    });
  }
  savelike(comment: Comment, status: string) {
    console.log(comment);
    if (!comment.ActiveLike.id) {
      let like = new Like();
      like.id = 0;
      like.userID = this.user.id;
      like.status = ' ';
      like.commentID = comment.id;
      comment.ActiveLike = like;
    }
    
    comment.ActiveLike.status = status;

    this.eventService.addLike(comment.ActiveLike).subscribe((data) => {
      const correctCommentIndex = this.comments.findIndex(
        (c) => c.comment.id === comment.id
      );
      if (correctCommentIndex !== -1) {
        this.comments[correctCommentIndex].comment = data;
      }
      this.findActiveLike();
    });
  }

  removeLike(comment: Comment) {
    this.eventService.addLike(comment.ActiveLike).subscribe((data) => {
      const correctCommentIndex = this.comments.findIndex(
        (c) => c.comment.id === comment.id
      );
      if (correctCommentIndex !== -1) {
        this.comments[correctCommentIndex].comment = data;
      }
      this.findActiveLike();
    });
  }
  updateLike(comment: Comment, status: String): Comment {
    if (status == 'like') {
    } else {
    }
    return comment;
  }
  findActiveLike() {
    let like = new Like();
    like.id = 0;
    like.userID = this.user.id;
    like.status = ' ';
    this.comments.forEach((comment) => {
      console.log(comment);
      // Check if comment.comment.likes is not undefined before accessing it
      if (comment.comment.likes) {
        comment.comment.ActiveLike =
          comment.comment.likes.find((rate) => rate.userID == this.user.id) ||
          like;
      } else {
        comment.comment.ActiveLike = like;
      }
      comment.comment.ActiveLike.commentID = comment.comment.id;
      comment.comment.eventID = comment.comment.eventID;
      console.log('with Active ');
      console.log(comment);
    });
    console.log(this.comments);
  }

  displayCount: number = 3;

  increaseDisplayCount() {
    this.displayCount += 3;
  }
}
