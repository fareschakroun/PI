import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {Comment, Like} from '../models/comment';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  

  constructor(private http: HttpClient) { }

  public getPostsList(page: number, size: number): Observable<Post[]>{
    const params = new HttpParams()
    .set('page',page.toString())
    .set('size', size.toString());
    console.log("Getting ALL")
    return this.http.get<Post[]>('http://localhost:8222/api/Posts/retrieve-all-posts',{params});
  }
 
  public addPost(post: Post): Observable<Object> {
    return this.http.post<Post>(`http://localhost:8222/api/Posts/add-post`, post);
  }

  public updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`http://localhost:8222/api/Posts/update-post`, post);
  }

  public deletePost(IdPost: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8222/api/Posts/remove-post/${IdPost}`);
  }

  public getPost(IdPost: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:8222/api/Posts/retrieve-post/${IdPost}`);}


  public getComments(IdPost: number): Observable<Comment[]> {
    return this.http.get<Comment[]> (`http://localhost:8222/api/Comments/retrieve-comment/${IdPost}`);
  }

  addComment(c: Comment, idPost: number): Observable<Comment> {
    const url = `http://localhost:8222/api/Comments/add-comment/${idPost}`;
    console.log("current message =="+c.textComment)
    return this.http.post<Comment>(url, c);
  }

  public updateComment(comment: Comment, postId: number): Observable<Comment> {
    return this.http.put<Comment>(`http://localhost:8222/api/Comments/update-comment/${postId}`, comment);
  }

  public deleteComment(idComment: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8222/api/Comments/remove-comment/${idComment}`);
  }

  
  public updatePost1(post: any) {
    return this.http.put('http://localhost:8222/api/Posts/update-post', post);
  }

  likePost(postId: number): Observable<void> {
    return this.http.put<void>(`http://localhost:8222/api/Posts/${postId}/like`, {});
  }

  dislikePost(postId: number): Observable<void> {
    return this.http.put<void>(`http://localhost:8222/api/Posts/${postId}/dislike`, {});
  }

  findTagByName(tagname: string): Observable<Tag> {
    return this.http.get<Tag>("http://localhost:8222/api/Posts/findTagByName/"+tagname);
  }
  findbyTags(tags:Tag[]): Observable<Post[]> {
    return this.http.post<Post[]>("http://localhost:8222/api/Posts/findByTags",tags);
  }
  addLike(Like:Like):Observable<Comment>{
    return  this.http.post<Comment>("http://localhost:8222/api/Comments/addLike",Like);
  }

  removeLike(Like:Like):Observable<Comment>{
    return  this.http.post<Comment>("http://localhost:8222/api/Comments//removeLike",Like);
  }
}
